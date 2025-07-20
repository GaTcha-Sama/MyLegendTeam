import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Initialiser la base de données
async function getDb() {
  const dbPath = path.join(process.cwd(), 'data', 'mylegendteam.db');
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');
    
    const db = await getDb();
    
    let query = `
      SELECT 
        p.id,
        p.name,
        p.lastname,
        n.name as nationality,
        n.flag,
        s.name as sport,
        pos.name as position,
        p.photo,
        t1.name as team1,
        t1.team_logo as team1_logo,
        t2.name as team2,
        t2.team_logo as team2_logo,
        t3.name as team3,
        t3.team_logo as team3_logo,
        p.active
      FROM players p
      LEFT JOIN nationalities n ON p.nationality_id = n.id
      LEFT JOIN teams t1 ON p.team1_id = t1.id
      LEFT JOIN teams t2 ON p.team2_id = t2.id
      LEFT JOIN teams t3 ON p.team3_id = t3.id
      LEFT JOIN positions pos ON p.position_id = pos.id
      LEFT JOIN sports s ON p.sport_id = s.id
    `;
    
    const params: string[] = [];
    
    if (sport) {
      query += ' WHERE s.name = ?';
      params.push(sport);
    }
    
    const players = await db.all(query, params);
    
    return NextResponse.json(players);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}