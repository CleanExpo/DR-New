
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { job_type, inputs } = body;
    if (!job_type || !inputs) {
        return NextResponse.json({error: 'Invalid input. Please provide job_type and inputs.'}, {status: 400});
    }

    let calculationResult;
    switch (job_type) {
        case 'water_damage':
            calculationResult = calculateWaterDamage(inputs);
            break;
        case 'mould_remediation':
            calculationResult = calculateMouldRemediation(inputs);
            break;
        case 'fire_smoke':
            calculationResult = calculateFireSmoke(inputs);
            break;
        case 'storm_damage':
            calculationResult = calculateStormDamage(inputs);
            break;
        case 'biohazard':
            calculationResult = calculateBiohazard(inputs);
            break;
        default:
            return NextResponse.json({error: 'Unknown job type.'}, {status: 400});
    }

    return NextResponse.json(calculationResult);
}

function calculateWaterDamage(inputs: Record<string, number>) {
    const rate = 18;
    const subtotal = rate * inputs.area;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'water_damage',
        inputs_received: inputs,
        line_items: [
            { name: 'Extraction', rate_source: 'NRPG', quantity: inputs.area, unit_rate: rate, subtotal }
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
        validation_band: { p25: 3024, median: 8671, p75: 9557 }
    };
}

function calculateMouldRemediation(inputs: Record<string, number | boolean>) {
    const rate = 18;
    const area = Number(inputs.area_m2) || 0;
    const containmentCost = inputs.containment_required ? 450 : 0;
    const subtotal = rate * area + containmentCost;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'mould_remediation',
        inputs_received: inputs,
        line_items: [
            { name: 'Mould Treatment', rate_source: 'NRPG', quantity: area, unit_rate: rate, subtotal: rate * area },
            ...(inputs.containment_required ? [{ name: 'Containment Setup', rate_source: 'NRPG', quantity: 1, unit_rate: 450, subtotal: 450 }] : [])
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
    };
}

function calculateFireSmoke(inputs: Record<string, number | boolean>) {
    const rate = 16;
    const area = Number(inputs.area_m2) || 0;
    const odourCost = inputs.has_odour_treatment ? 12 * area : 0;
    const subtotal = rate * area + odourCost;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'fire_smoke',
        inputs_received: inputs,
        line_items: [
            { name: 'Smoke Cleaning', rate_source: 'NRPG', quantity: area, unit_rate: rate, subtotal: rate * area },
            ...(inputs.has_odour_treatment ? [{ name: 'Deodorisation', rate_source: 'NRPG', quantity: area, unit_rate: 12, subtotal: odourCost }] : [])
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
    };
}

function calculateStormDamage(inputs: Record<string, number | boolean>) {
    const rate = 22;
    const area = Number(inputs.area_m2) || 0;
    const assessmentCost = inputs.structural_assessment ? 550 : 0;
    const subtotal = rate * area + assessmentCost;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'storm_damage',
        inputs_received: inputs,
        line_items: [
            { name: 'Tarping', rate_source: 'NRPG', quantity: area, unit_rate: rate, subtotal: rate * area },
            ...(inputs.structural_assessment ? [{ name: 'Structural Assessment', rate_source: 'NRPG', quantity: 1, unit_rate: 550, subtotal: 550 }] : [])
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
    };
}

function calculateBiohazard(inputs: Record<string, number | string>) {
    const rate = 45;
    const area = Number(inputs.area_m2) || 0;
    const subtotal = rate * area;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'biohazard',
        inputs_received: inputs,
        line_items: [
            { name: 'Biohazard Cleaning', rate_source: 'NRPG', quantity: area, unit_rate: rate, subtotal: rate * area }
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
    };
}
