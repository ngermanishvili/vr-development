import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET() {
  try {
    const query = `
      SELECT 
        p.*,
        COUNT(DISTINCT b.id) as total_buildings,
        COUNT(DISTINCT bl.id) as total_blocks,
        COUNT(DISTINCT a.id) as total_apartments,
        COUNT(CASE WHEN a.status = 'available' THEN 1 END) as available_apartments,
        COUNT(CASE WHEN a.status = 'likely_sold' THEN 1 END) as likely_sold_apartments
      FROM krtsanisi_projects p
      LEFT JOIN krtsanisi_buildings b ON p.id = b.project_id
      LEFT JOIN krtsanisi_blocks bl ON b.id = bl.building_id
      LEFT JOIN krtsanisi_apartments a ON bl.id = a.block_id
      GROUP BY p.id
    `;

    const projects = await executeQuery(query);
    
    return NextResponse.json({
      success: true,
      data: projects
    });

  } catch (error) {
    console.error('Krtsanisi projects API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi projects' },
      { status: 500 }
    );
  }
}