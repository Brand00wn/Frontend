import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    api.get('/tickets').then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Chamados</h1>
          <p className="page-subtitle">Gerenciamento de tickets de manutenção.</p>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Máquina</th>
              <th>Descrição</th>
              <th>Severidade</th>
              <th>Status</th>
              <th>Reportado em</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <motion.tr 
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <td style={{ fontWeight: 600 }}>{t.machineName || t.machineId}</td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.description}</td>
                <td>
                  <span className={`badge ${t.severity === 0 ? 'info' : t.severity === 1 ? 'warning' : 'danger'}`}>
                    {t.severity === 0 ? 'Baixa' : t.severity === 1 ? 'Média' : 'Alta'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${t.status === 0 ? 'warning' : t.status === 1 ? 'info' : t.status === 2 ? 'success' : 'danger'}`}>
                    {t.status === 0 ? 'Aberto' : t.status === 1 ? 'Em Progresso' : t.status === 2 ? 'Resolvido' : 'Fechado'}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
