import React, { useEffect, useState } from 'react';
import './Team.css';

const COLORS = ['#00e5ff', '#7c3aed', '#f59e0b', '#10b981', '#ff6b6b', '#4ecdc4'];
const BACKEND_URL = 'https://nexatech-backend-qeti.onrender.com';

export default function Team({ standalone }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/team/`)
      .then((r) => r.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to local data if API fails
        setTeam([
          { id: 1, name: 'Waseth Emmanuel', role: 'Lead Developer', initials: 'WE' },
          { id: 2, name: 'Schroeder Njogu', role: 'Security Architect', initials: 'SN' },
          { id: 3, name: 'Allan Manoti', role: 'Cloud Engineer', initials: 'AM' },
          { id: 4, name: 'Sam Ndaka', role: 'DevOps Specialist', initials: 'SN' },
          { id: 5, name: 'Emmanuel Osinde', role: 'AI/ML Engineer', initials: 'EO' },
          { id: 6, name: 'Brilliant Kimari', role: 'Frontend Developer', initials: 'BK' },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="team" id="team" style={standalone ? { paddingTop: 120 } : {}}>
        <div className="container">
          <p className="section-label">The People</p>
          <h2 className="section-title">Meet Our Team</h2>
          <div className="loading">Loading team members…</div>
        </div>
      </section>
    );
  }

  return (
    <section className="team" id="team" style={standalone ? { paddingTop: 120 } : {}}>
      <div className="container">
        <p className="section-label">The People</p>
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-sub" style={{ marginBottom: 48 }}>
          Passionate engineers, strategists, and problem-solvers driving NexaTech forward.
        </p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={member.id} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="avatar" style={{ background: `linear-gradient(135deg, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 1) % COLORS.length]})` }}>
                {member.initials}
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
