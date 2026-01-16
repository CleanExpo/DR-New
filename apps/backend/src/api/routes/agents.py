"""
Agent orchestration API routes

POST /api/v1/agents/orchestrate - Execute an agent workflow
GET  /api/v1/agents/status/{job_id} - Get job status
POST /api/v1/agents/cancel/{job_id} - Cancel a running job
POST /api/v1/agents/resume/{job_id} - Resume a paused job
"""

from typing import Optional
from enum import Enum
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, Field
import structlog
import uuid

from ...auth import get_current_user, NextAuthUser

router = APIRouter()
logger = structlog.get_logger()


class WorkflowType(str, Enum):
    """Available workflow types"""

    DISASTER_ANALYSIS = "DISASTER_ANALYSIS"
    CLAIM_PROCESSING = "CLAIM_PROCESSING"
    CONTRACTOR_MATCHING = "CONTRACTOR_MATCHING"
    INSPECTION_REPORT = "INSPECTION_REPORT"
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT"
    CUSTOM = "CUSTOM"


class AgentJobStatus(str, Enum):
    """Job status values"""

    PENDING = "PENDING"
    ROUTING = "ROUTING"
    PROCESSING = "PROCESSING"
    AWAITING_HUMAN = "AWAITING_HUMAN"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class OrchestrateRequest(BaseModel):
    """Request body for workflow orchestration"""

    workflow: WorkflowType = Field(..., description="Type of workflow to execute")
    input: dict = Field(..., description="Workflow-specific input data")
    stream: bool = Field(default=False, description="Enable SSE streaming")
    tenant_id: Optional[str] = Field(default=None, description="Multi-tenant context")


class OrchestrateResponse(BaseModel):
    """Response from workflow orchestration"""

    success: bool
    job_id: str
    status: str
    message: Optional[str] = None
    output: Optional[dict] = None
    error: Optional[str] = None
    metrics: Optional[dict] = None


class JobStatusResponse(BaseModel):
    """Response for job status query"""

    job_id: str
    status: AgentJobStatus
    workflow_type: str
    current_node: Optional[str] = None
    progress: int = 0
    output: Optional[dict] = None
    error: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None


# In-memory job storage (replace with database in production)
_jobs: dict[str, dict] = {}


async def execute_workflow_background(job_id: str, workflow_type: str, input_data: dict):
    """Background task to execute workflow"""
    logger.info("Starting workflow execution", job_id=job_id, workflow_type=workflow_type)

    try:
        # Update job status to processing
        _jobs[job_id]["status"] = AgentJobStatus.PROCESSING

        # TODO: Implement actual LangGraph workflow execution
        # For now, simulate processing
        import asyncio

        await asyncio.sleep(2)

        # Mark as completed
        _jobs[job_id]["status"] = AgentJobStatus.COMPLETED
        _jobs[job_id]["output"] = {"result": "Workflow completed successfully"}
        _jobs[job_id]["progress"] = 100

        logger.info("Workflow completed", job_id=job_id)

    except Exception as e:
        _jobs[job_id]["status"] = AgentJobStatus.FAILED
        _jobs[job_id]["error"] = str(e)
        logger.error("Workflow failed", job_id=job_id, error=str(e))


@router.post("/orchestrate", response_model=OrchestrateResponse)
async def orchestrate_workflow(
    request: OrchestrateRequest,
    background_tasks: BackgroundTasks,
    user: NextAuthUser = Depends(get_current_user),
) -> OrchestrateResponse:
    """
    Execute an AI agent workflow.

    Workflows:
    - DISASTER_ANALYSIS: Analyse disaster scenarios
    - CLAIM_PROCESSING: Process insurance claims
    - CONTRACTOR_MATCHING: Match contractors to jobs
    - INSPECTION_REPORT: Generate inspection reports
    - CUSTOMER_SUPPORT: Handle support queries
    """
    logger.info(
        "Agent orchestration requested",
        user_id=user.id,
        workflow_type=request.workflow.value,
    )

    # Create job ID
    job_id = str(uuid.uuid4())

    # Store job info
    _jobs[job_id] = {
        "job_id": job_id,
        "user_id": user.id,
        "workflow_type": request.workflow.value,
        "status": AgentJobStatus.PENDING,
        "input": request.input,
        "output": None,
        "error": None,
        "progress": 0,
        "current_node": None,
    }

    # Execute in background
    background_tasks.add_task(
        execute_workflow_background,
        job_id,
        request.workflow.value,
        request.input,
    )

    return OrchestrateResponse(
        success=True,
        job_id=job_id,
        status=AgentJobStatus.PENDING.value,
        message="Job queued for execution",
    )


@router.get("/status/{job_id}", response_model=JobStatusResponse)
async def get_job_status(
    job_id: str,
    user: NextAuthUser = Depends(get_current_user),
) -> JobStatusResponse:
    """Get the status of an agent job"""
    job = _jobs.get(job_id)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job {job_id} not found",
        )

    # Verify user owns the job
    if job["user_id"] != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this job",
        )

    return JobStatusResponse(
        job_id=job["job_id"],
        status=job["status"],
        workflow_type=job["workflow_type"],
        current_node=job.get("current_node"),
        progress=job.get("progress", 0),
        output=job.get("output"),
        error=job.get("error"),
    )


@router.post("/cancel/{job_id}")
async def cancel_job(
    job_id: str,
    user: NextAuthUser = Depends(get_current_user),
) -> dict:
    """Cancel a running agent job"""
    job = _jobs.get(job_id)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job {job_id} not found",
        )

    if job["user_id"] != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this job",
        )

    if job["status"] in (AgentJobStatus.COMPLETED, AgentJobStatus.FAILED):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot cancel a completed or failed job",
        )

    job["status"] = AgentJobStatus.CANCELLED
    logger.info("Job cancelled", job_id=job_id, user_id=user.id)

    return {"success": True, "message": f"Job {job_id} cancelled"}


@router.get("/active")
async def get_active_jobs(
    user: NextAuthUser = Depends(get_current_user),
) -> list[JobStatusResponse]:
    """Get all active jobs for the current user"""
    active_statuses = {
        AgentJobStatus.PENDING,
        AgentJobStatus.ROUTING,
        AgentJobStatus.PROCESSING,
        AgentJobStatus.AWAITING_HUMAN,
    }

    user_jobs = [
        JobStatusResponse(
            job_id=job["job_id"],
            status=job["status"],
            workflow_type=job["workflow_type"],
            current_node=job.get("current_node"),
            progress=job.get("progress", 0),
        )
        for job in _jobs.values()
        if job["user_id"] == user.id and job["status"] in active_statuses
    ]

    return user_jobs
