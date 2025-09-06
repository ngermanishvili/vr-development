import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    
    let query = `
      SELECT 
        b.*,
        p.name as project_name,
        COUNT(DISTINCT bl.id) as total_blocks,
        COUNT(DISTINCT a.id) as total_apartments,
        COUNT(CASE WHEN a.status = 'available' THEN 1 END) as available_apartments,
        COUNT(CASE WHEN a.status = 'likely_sold' THEN 1 END) as likely_sold_apartments
      FROM krtsanisi_buildings b
      JOIN krtsanisi_projects p ON b.project_id = p.id
      LEFT JOIN krtsanisi_blocks bl ON b.id = bl.building_id
      LEFT JOIN krtsanisi_apartments a ON bl.id = a.block_id
    `;

    const params = [];
    
    if (projectId) {
      query += ' WHERE b.project_id = ?';
      params.push(projectId);
    }

    query += ' GROUP BY b.id ORDER BY b.building_id';

    const buildings = await executeQuery(query, params);
    
    return NextResponse.json({
      success: true,
      data: buildings
    });

  } catch (error) {
    console.error('Krtsanisi buildings API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi buildings' },
      { status: 500 }
    );
  }
}