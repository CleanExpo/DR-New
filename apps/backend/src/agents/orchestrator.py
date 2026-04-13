"""
Agent Orchestrator

Main orchestration class for LangGraph workflows.
Handles workflow routing, execution, and state management.
"""

from typing import Any, Dict, Optional
from enum import Enum
import structlog
import uuid
from datetime import datetime

logger = structlog.get_logger()


class WorkflowType(str, Enum):
    """Available workflow types"""

    DISASTER_ANALYSIS = "DISASTER_ANALYSIS"
    CLAIM_PROCESSING = "CLAIM_PROCESSING"
    CONTRACTOR_MATCHING = "CONTRACTOR_MATCHING"
    INSPECTION_REPORT = "INSPECTION_REPORT"
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT"
    CUSTOM = "CUSTOM"


class JobStatus(str, Enum):
    """Job status values"""

    PENDING = "PENDING"
    ROUTING = "ROUTING"
    PROCESSING = "PROCESSING"
    AWAITING_HUMAN = "AWAITING_HUMAN"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


# Workflows that have real implementations (expand as each is built).
_IMPLEMENTED_WORKFLOWS: set[str] = set()


class AgentOrchestrator:
    """
    Orchestrates LangGraph workflows for AI agent execution.

    Jobs are currently held in-memory. Persistent job storage via the
    shared Supabase PostgreSQL database is tracked in DR-NRPG Phase 4
    (see docs/runbooks/platform-health-recovery.md).
    """

    def __init__(self) -> None:
        self._jobs: Dict[str, Dict[str, Any]] = {}
        logger.info("AgentOrchestrator initialized")

    async def create_job(
        self,
        workflow_type: str,
        user_id: str,
        input_data: Dict[str, Any],
        metadata: Optional[Dict[str, Any]] = None,
    ) -> str:
        """
        Create a new agent job.

        Args:
            workflow_type: Type of workflow to execute (WorkflowType enum value)
            user_id: ID of the user initiating the job
            input_data: Input data for the workflow
            metadata: Optional metadata

        Returns:
            Job ID (UUID string)
        """
        job_id = str(uuid.uuid4())

        self._jobs[job_id] = {
            "id": job_id,
            "workflow_type": workflow_type,
            "user_id": user_id,
            "status": JobStatus.PENDING,
            "input": input_data,
            "output": None,
            "error": None,
            "metadata": metadata or {},
            "current_node": None,
            "progress": 0,
            "iterations": 0,
            "total_tokens": 0,
            "total_cost": 0.0,
            "started_at": None,
            "completed_at": None,
            "created_at": datetime.utcnow().isoformat(),
        }

        logger.info(
            "Job created",
            job_id=job_id,
            workflow_type=workflow_type,
            user_id=user_id,
        )

        return job_id

    async def execute_job(self, job_id: str) -> Dict[str, Any]:
        """
        Execute a job by routing it to the appropriate workflow handler.

        Raises ValueError for unimplemented workflow types so callers
        receive an honest error rather than silently succeeding with mock data.

        Args:
            job_id: ID of the job to execute

        Returns:
            Job result dict with keys: job_id, status, output
        """
        job = self._jobs.get(job_id)
        if not job:
            raise ValueError(f"Job {job_id} not found")

        workflow_type: str = job["workflow_type"]

        try:
            job["status"] = JobStatus.ROUTING
            job["started_at"] = datetime.utcnow().isoformat()

            logger.info("Routing job", job_id=job_id, workflow_type=workflow_type)

            if workflow_type not in _IMPLEMENTED_WORKFLOWS:
                raise NotImplementedError(
                    f"Workflow '{workflow_type}' is not yet implemented. "
                    "See DR-NRPG Phase 4 in the platform health recovery plan."
                )

            # Route to implemented workflow handler.
            result = await self._dispatch(workflow_type, job)

            job["status"] = JobStatus.COMPLETED
            job["completed_at"] = datetime.utcnow().isoformat()
            job["progress"] = 100
            job["output"] = result

            logger.info("Job completed", job_id=job_id)

            return {
                "job_id": job_id,
                "status": job["status"].value,
                "output": result,
            }

        except NotImplementedError as exc:
            job["status"] = JobStatus.FAILED
            job["error"] = str(exc)
            job["completed_at"] = datetime.utcnow().isoformat()

            logger.warning(
                "Unimplemented workflow requested",
                job_id=job_id,
                workflow_type=workflow_type,
                error=str(exc),
            )

            return {
                "job_id": job_id,
                "status": job["status"].value,
                "error": str(exc),
            }

        except Exception as exc:
            job["status"] = JobStatus.FAILED
            job["error"] = str(exc)
            job["completed_at"] = datetime.utcnow().isoformat()

            logger.error("Job failed", job_id=job_id, error=str(exc))

            return {
                "job_id": job_id,
                "status": job["status"].value,
                "error": str(exc),
            }

    async def _dispatch(
        self, workflow_type: str, job: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Route to the appropriate workflow implementation.

        Each workflow type listed in _IMPLEMENTED_WORKFLOWS must have
        a corresponding branch here.
        """
        # No workflows implemented yet; this block will be extended as
        # each workflow is built (Phase 4 of the health recovery plan).
        raise NotImplementedError(f"No dispatch handler for '{workflow_type}'")

    async def get_job_status(
        self, job_id: str, user_id: str
    ) -> Optional[Dict[str, Any]]:
        """
        Get the status of a job.

        Returns None if the job does not exist or the user is not the owner.
        """
        job = self._jobs.get(job_id)
        if not job:
            return None

        if job["user_id"] != user_id:
            return None

        return {
            "job_id": job["id"],
            "status": (
                job["status"].value
                if isinstance(job["status"], JobStatus)
                else job["status"]
            ),
            "workflow_type": job["workflow_type"],
            "current_node": job.get("current_node"),
            "progress": job.get("progress", 0),
            "output": job.get("output"),
            "error": job.get("error"),
            "started_at": job.get("started_at"),
            "completed_at": job.get("completed_at"),
        }

    async def cancel_job(self, job_id: str, user_id: str) -> bool:
        """
        Cancel a running job.

        Returns True if cancelled, False if not found, not owned, or already terminal.
        """
        job = self._jobs.get(job_id)
        if not job or job["user_id"] != user_id:
            return False

        if job["status"] in (JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED):
            return False

        job["status"] = JobStatus.CANCELLED
        job["completed_at"] = datetime.utcnow().isoformat()

        logger.info("Job cancelled", job_id=job_id)
        return True

    async def resume_job(self, job_id: str, user_id: str) -> Dict[str, Any]:
        """
        Resume a paused or failed job from last checkpoint.

        Until checkpointing is implemented this simply re-executes the job.
        """
        job = self._jobs.get(job_id)
        if not job or job["user_id"] != user_id:
            raise ValueError(f"Job {job_id} not found or not authorised")

        return await self.execute_job(job_id)
