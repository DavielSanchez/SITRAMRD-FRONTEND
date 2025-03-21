import React from 'react';
import Sidebar from '../components/Administrador/SideBar';
import AuditHeader from '../components/Administrador/Auditoria/AuditHeader';
import AuditSearch from '../components/Administrador/Auditoria/AuditSearch';
import AuditTable from '../components/Administrador/Auditoria/AuditTable';
import AuditTableRow from '../components/Administrador/Auditoria/AuditTableRow';

function Auditoria() {
  return (
    <div className="relative bg-white min-h-screen">
      {/* Sidebar lateral */}
      <Sidebar />
      <div className="ml-[145px]">
        <AuditHeader />
        <div className="pt-[25px] px-6">
          <AuditSearch />
          <AuditTable />
        </div>
      </div>
    </div>
  );
}

export default Auditoria;
