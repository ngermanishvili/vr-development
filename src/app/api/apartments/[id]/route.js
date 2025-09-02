import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

// GET /api/apartments/[id] - Get specific apartment details
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const query = `
      SELECT 
        a.*,
        b.block_name,
        b.block_code,
        b.total_floors,
        p.name as project_name,
        p.location as project_location,
        f.coords as floor_coordinates
      FROM apartments a
      JOIN blocks b ON a.block_id = b.id
      JOIN projects p ON b.project_id = p.id
      LEFT JOIN floors f ON a.block_id = f.block_id AND a.floor = f.floor_number
      WHERE a.id = ?
    `;

    const apartments = await executeQuery(query, [id]);

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
    console.error('Apartment details API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apartment details' },
      { status: 500 }
    );
  }
}