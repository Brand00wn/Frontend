import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';

export default function Operators() {
  const [operators, setOperators] = useState<any[]>([]);

  useEffect(() => {
    api.get('/users').then(res => setOperators(res.data.filter((u: any) => u.role === 1 || u.role === 2)));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Operadores</h1>
          <p className="page-subtitle">Visualização de equipe e equipe de manutenção.</p>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((o, i) => (
              <motion.tr 
                key={o.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <td style={{ fontWeight: 600 }}>{o.registration}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {o.name.charAt(0)}
                    </div>
                    {o.name}
                  </div>
                </td>
                <td>{o.role === 1 ? 'Operador' : 'Manutenção'}</td>
                <td>
                  <span className={`badge ${o.active ? 'success' : 'danger'}`}>
                    {o.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
