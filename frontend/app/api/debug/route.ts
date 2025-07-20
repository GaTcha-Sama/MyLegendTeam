import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'data', 'mylegendteam.db');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    const players = await db.all('SELECT * FROM players LIMIT 5');
    
    return NextResponse.json({
      totalPlayers: players.length,
      samplePlayer: players[0],
      dbPath: dbPath,
      exists: require('fs').existsSync(dbPath)
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 