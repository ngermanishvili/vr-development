import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const apartmentId = params.id;

    const query = `
      SELECT 
        a.*,
        bl.block_name,
        bl.block_number,
        b.building_name,
        b.building_id as building_code,
        p.name as project_name,
        p.location as project_location
      FROM krtsanisi_apartments a
      JOIN krtsanisi_blocks bl ON a.block_id = bl.id
      JOIN krtsanisi_buildings b ON a.building_id = b.id
      JOIN krtsanisi_projects p ON b.project_id = p.id
      WHERE a.id = ?
    `;

    const apartments = await executeQuery(query, [apartmentId]);
    
    if (apartments.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Apartment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: apartments[0]
    });

  } catch (error) {
    console.error('Krtsanisi apartment detail API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apartment details' },
      { status: 500 }
    );
  }
}