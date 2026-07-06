import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Printer, X, Plus } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Machines() {
  const [machines, setMachines] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);

  useEffect(() => {
    api.get('/machines').then(res => setMachines(res.data));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Máquinas</h1>
          <p className="page-subtitle">Gerencie os equipamentos e gere os QR Codes.</p>
        </div>
        <button className="btn-primary"><Plus size={18}/> Nova Máquina</button>
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>TAG</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m, i) => (
              <motion.tr 
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <td style={{ fontWeight: 600 }}>{m.tag}</td>
                <td>{m.name}</td>
                <td>
                  <span className={`badge ${m.status === 0 ? 'success' : m.status === 1 ? 'warning' : 'danger'}`}>
                    {m.status === 0 ? 'Ativa' : m.status === 1 ? 'Manutenção' : 'Inativa'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedMachine(m)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}
                  >
                    <QrCode size={16} /> QR Code
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedMachine && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass"
              style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative' }}
            >
              <button 
                onClick={() => setSelectedMachine(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>
              
              <h2 style={{ marginBottom: '8px' }}>{selectedMachine.tag}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{selectedMachine.name}</p>
              
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', display: 'inline-block', marginBottom: '32px' }}>
                <QRCodeCanvas 
                  value={JSON.stringify({ Id: selectedMachine.id, Tag: selectedMachine.tag })} 
                  size={200}
                  level="H"
                />
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={handlePrint}>
                <Printer size={18} /> Imprimir Etiqueta
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

