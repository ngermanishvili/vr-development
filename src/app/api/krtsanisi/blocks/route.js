import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const buildingId = searchParams.get('building_id');
    
    let query = `
      SELECT 
        bl.*,
        b.building_name,
        b.building_id as building_code,
        COUNT(DISTINCT a.id) as total_apartments,
        COUNT(CASE WHEN a.status = 'available' THEN 1 END) as available_apartments,
        COUNT(CASE WHEN a.status = 'likely_sold' THEN 1 END) as likely_sold_apartments
      FROM krtsanisi_blocks bl
      JOIN krtsanisi_buildings b ON bl.building_id = b.id
      LEFT JOIN krtsanisi_apartments a ON bl.id = a.block_id
    `;

    const params = [];
    
    if (buildingId) {
      query += ' WHERE bl.building_id = ?';
      params.push(buildingId);
    }

    query += ' GROUP BY bl.id ORDER BY bl.block_number';

    const blocks = await executeQuery(query, params);
    
    return NextResponse.json({
      success: true,
      data: blocks
    });

  } catch (error) {
    console.error('Krtsanisi blocks API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi blocks' },
      { status: 500 }
    );
  }
}