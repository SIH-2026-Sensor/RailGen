import React, { createContext, useContext, useState, useEffect } from 'react';

const RailGenContext = createContext(null);

export const DEMO_USERS = {
  admin: {
    id: 'EMP-ADM-001',
    name: 'Vikramaditya Rao',
    email: 'admin@railgen.demo',
    department: 'Admin',
    role: 'Principal Chief Operations Manager (PCOM)',
    zone: 'Northern Railway (HQ Baroda House)',
    avatar: 'VR'
  },
  manager: {
    id: 'EMP-MGR-104',
    name: 'Ananya Deshmukh',
    email: 'manager@railgen.demo',
    department: 'Manager',
    role: 'Senior Divisional Operations Manager (Sr. DOM)',
    zone: 'Firozpur Division / Northern Railway',
    avatar: 'AD'
  },
  engineering: {
    id: 'EMP-ENG-422',
    name: 'Suresh Chandra P-Way',
    email: 'engineering@railgen.demo',
    department: 'Engineering',
    role: 'Senior Divisional Engineer (Sr. DEN / Civil)',
    zone: 'Ludhiana Sub-Division',
    avatar: 'SC'
  },
  traction: {
    id: 'EMP-TRD-309',
    name: 'Gurpreet Singh',
    email: 'traction@railgen.demo',
    department: 'Traction',
    role: 'Divisional Electrical Engineer (DEE / TRD)',
    zone: 'Jalandhar Cantt TRD Depot',
    avatar: 'GS'
  },
  signal: {
    id: 'EMP-SNT-581',
    name: 'Dr. Priya Raghavan',
    email: 'signal@railgen.demo',
    department: 'Signal & Telecom',
    role: 'Senior Divisional Signal & Telecom Engineer (Sr. DSTE)',
    zone: 'Ambala - Ludhiana S&T Control',
    avatar: 'PR'
  }
};

const INITIAL_REQUESTS = [
  {
    id: 'REQ-ENG-1042',
    department: 'Engineering',
    section: 'LDH - JUC (Km 342/10 - 344/18)',
    corridor: 'Ludhiana - Jalandhar Up Line',
    issue: 'Deep Screening & Ultrasonic Rail Flaw (USFD) rectification',
    maintenanceType: 'Track Renewal & Tamping',
    severity: 'Critical',
    duration: '3.5 Hours',
    durationHours: 3.5,
    preferredWindow: '01:30 - 05:00 hrs',
    crew: 'BCM Machine #42 + 22 Trackmen',
    status: 'AI Analyzed',
    reportedDate: '2026-09-06 06:30',
    description: 'Detected micro-crack transverse fissure at weld joint Km 343/14. Imposed 30 km/h temporary speed restriction (TSR). Block mandatory.'
  },
  {
    id: 'REQ-TRD-2089',
    department: 'Traction',
    section: 'LDH - JUC (Km 341/04 - 345/20)',
    corridor: 'Ludhiana - Jalandhar Up Line',
    issue: 'OHE Catenary Wire Dropper Inspection & Cantilever Adjustment',
    maintenanceType: 'OHE Power & Traffic Block',
    severity: 'High',
    duration: '3.0 Hours',
    durationHours: 3.0,
    preferredWindow: '02:00 - 05:00 hrs',
    crew: 'Tower Wagon TW-08 + 9 TRD Staff',
    status: 'AI Analyzed',
    reportedDate: '2026-09-06 07:15',
    description: 'Hot spot thermal anomaly recorded at section insulator 343/2. Requires 25kV power shutdown and contact wire height re-calibration.'
  },
  {
    id: 'REQ-SNT-3014',
    department: 'Signal & Telecom',
    section: 'LDH Yard - Outer (Km 340/15 - 342/02)',
    corridor: 'Ludhiana - Jalandhar Section',
    issue: 'Point Machine 104A Overhaul & Track Circuit Glued Joint Renewal',
    maintenanceType: 'Interlocking & Point Testing',
    severity: 'Medium',
    duration: '2.5 Hours',
    durationHours: 2.5,
    preferredWindow: '01:30 - 04:00 hrs',
    crew: 'ESM Gang #3 + Signal Inspector',
    status: 'AI Analyzed',
    reportedDate: '2026-09-06 08:00',
    description: 'Intermittent track circuit drop reported during wet conditions on Point 104A cross-over. Scheduled routine overhaul before monsoon.'
  },
  {
    id: 'REQ-ENG-1049',
    department: 'Engineering',
    section: 'UMB - LDH (Km 248/06 - 250/12)',
    corridor: 'Ambala - Ludhiana Down Line',
    issue: 'Ballast Shoulder Cleaning & Switch Expansion Joint (SEJ) replacement',
    maintenanceType: 'P-Way Preventive Maintenance',
    severity: 'Medium',
    duration: '2.5 Hours',
    durationHours: 2.5,
    preferredWindow: '11:00 - 13:30 hrs',
    crew: 'DGS Tamping Unit #14 + 14 Trackmen',
    status: 'Approved',
    reportedDate: '2026-09-05 14:20',
    description: 'Routine maintenance window for SEJ gap calibration prior to winter track thermal stress period.'
  },
  {
    id: 'REQ-TRD-2094',
    department: 'Traction',
    section: 'NDLS - GZB (Km 12/02 - 14/18)',
    corridor: 'New Delhi - Ghaziabad 4th Line',
    issue: 'Polymer Insulator Replacement & Mast Bonding Check',
    maintenanceType: 'OHE Breakdown Prevention',
    severity: 'High',
    duration: '2.0 Hours',
    durationHours: 2.0,
    preferredWindow: '00:30 - 02:30 hrs',
    crew: 'Anand Vihar TRD Depot Gang #2',
    status: 'Scheduled',
    reportedDate: '2026-09-05 18:45',
    description: 'Flashover trace detected on mast 13/8 insulator. Preventive replacement scheduled to prevent tripping.'
  }
];

const INITIAL_DEFECTS_CIVIL = [
  { id: 'DEF-TRK-881', location: 'Km 343/14 Up Line', section: 'LDH - JUC', type: 'Track Crack / Weld Flaw', severity: 'Critical', detected: '2026-09-06 06:15', speedLimit: '30 km/h TSR', status: 'Action Pending' },
  { id: 'DEF-TRK-882', location: 'Km 339/02 Yard', section: 'LDH Yard', type: 'Loose Fastening / ERC Missing', severity: 'Medium', detected: '2026-09-06 04:30', speedLimit: 'Normal', status: 'Gang Assigned' },
  { id: 'DEF-TRK-883', location: 'Km 352/20 Down Line', section: 'JUC Outer', type: 'Ballast Deficiency', severity: 'Low', detected: '2026-09-05 16:10', speedLimit: 'Normal', status: 'Scheduled' },
  { id: 'DEF-TRK-884', location: 'Km 346/08 Up Line', section: 'LDH - JUC', type: 'Track Geometry / Alignment Error', severity: 'High', detected: '2026-09-05 11:20', speedLimit: '50 km/h TSR', status: 'AI Block Requested' }
];

const INITIAL_FAULTS_TRD = [
  { id: 'FLT-OHE-401', asset: 'Cantilever & Dropper #343/2', section: 'LDH - JUC Up', type: 'Catenary Hotspot & Sag', severity: 'High', detected: '2026-09-06 07:05', powerIsolated: 'No', status: 'Block Queued' },
  { id: 'FLT-OHE-402', asset: 'Traction Sub-Station (TSS)', section: 'Jalandhar TSS', type: 'Transformer Oil Temp Alert', severity: 'Medium', detected: '2026-09-06 05:40', powerIsolated: 'Normal', status: 'Under Observation' },
  { id: 'FLT-OHE-403', asset: 'Insulator Mast 322/16', section: 'UMB - LDH', type: 'Insulator Chipped Glaze', severity: 'Low', detected: '2026-09-04 19:20', powerIsolated: 'No', status: 'Resolved' }
];

const INITIAL_FAULTS_SNT = [
  { id: 'FLT-SIG-601', system: 'Point Machine 104A', location: 'LDH Yard Interlocking', type: 'Point Machine Detection Sluggish', severity: 'High', detected: '2026-09-06 07:55', backupActive: 'Yes', status: 'Block Queued' },
  { id: 'FLT-SIG-602', system: 'Track Circuit TC-343', location: 'Km 343/00 - 344/00', type: 'Track Circuit Wet Leakage', severity: 'Critical', detected: '2026-09-06 06:45', backupActive: 'Caution Order', status: 'Urgent Action' },
  { id: 'FLT-SIG-603', system: 'Axle Counter Block Instrument', location: 'JUC Station Panel', type: 'Reset Counter Discrepancy', severity: 'Medium', detected: '2026-09-05 21:10', backupActive: 'Auto-switched', status: 'Calibrated' }
];

const INITIAL_CORRIDOR_TRAINS = [
  { id: '12004', name: 'New Delhi - Lucknow Shatabdi Express', type: 'Superfast / Premium', priority: 'High', speed: '130 km/h', corridor: 'NDLS - CNB', etaNextSection: '05:15 hrs', status: 'On Time' },
  { id: '12425', name: 'New Delhi - Jammu Tawi Rajdhani', type: 'Rajdhani Express', priority: 'Top Priority', speed: '130 km/h', corridor: 'UMB - LDH - JUC', etaNextSection: '01:10 hrs (Pre-block)', status: 'On Time' },
  { id: '22436', name: 'Vande Bharat Express', type: 'Semi-High Speed', priority: 'Top Priority', speed: '160 km/h', corridor: 'NDLS - BSB', etaNextSection: '06:00 hrs (Post-block)', status: 'On Time' },
  { id: 'BOXN-8892', name: 'Coal Freight Consignment (58 Wagons)', type: 'Freight / Bulk', priority: 'Routine', speed: '75 km/h', corridor: 'LDH - JUC Loop Line', etaNextSection: 'Can Divert via Loop', status: 'Diverted' }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'NOTIF-1', title: 'Critical Track Defect Reported', dept: 'Engineering', time: '12 mins ago', unread: true, severity: 'critical', message: 'Weld transverse crack at Km 343/14 (LDH-JUC Up Line). 30 km/h TSR placed.' },
  { id: 'NOTIF-2', title: 'Multi-Department Block Recommendation Ready', dept: 'AI Engine', time: '25 mins ago', unread: true, severity: 'info', message: 'AI combined REQ-ENG-1042, REQ-TRD-2089 & REQ-SNT-3014 into a single 3.5h window.' },
  { id: 'NOTIF-3', title: 'Traction OHE Insulator Anomaly', dept: 'Traction', time: '1 hour ago', unread: false, severity: 'warning', message: 'Thermal hotspot registered at Km 343/2. Request merged with Civil block.' },
  { id: 'NOTIF-4', title: 'Schedule Approved & Dispatched', dept: 'Manager', time: '3 hours ago', unread: false, severity: 'success', message: 'Block BLK-2026-0906-01 approved for UMB-LDH section tomorrow.' }
];

export function RailGenProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.manager);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [defectsCivil, setDefectsCivil] = useState(INITIAL_DEFECTS_CIVIL);
  const [faultsTrd, setFaultsTrd] = useState(INITIAL_FAULTS_TRD);
  const [faultsSnt, setFaultsSnt] = useState(INITIAL_FAULTS_SNT);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [trains, setTrains] = useState(INITIAL_CORRIDOR_TRAINS);
  
  // AI Recommendation State
  const [aiPlanStatus, setAiPlanStatus] = useState('PENDING_REVIEW'); // 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'GENERATING'
  const [approvedPlanDetails, setApprovedPlanDetails] = useState(null);

  // Active Corridor Block Plan
  const [activeMegaPlan, setActiveMegaPlan] = useState({
    planId: 'AI-BLOCK-LDH-JUC-904',
    section: 'LDH - JUC Up Line (Km 341.0 - 346.0)',
    date: 'Tomorrow (07-Sep-2026)',
    window: '01:30 hrs — 05:00 hrs',
    duration: '3 Hours 30 Minutes',
    departmentsIncluded: ['Engineering', 'Traction', 'Signal & Telecom'],
    requestsMerged: ['REQ-ENG-1042', 'REQ-TRD-2089', 'REQ-SNT-3014'],
    savedCorridorDowntime: '5.5 Hours (compared to 3 separate blocks of 9.0h total)',
    conflictsResolved: [
      'Pre-cleared 12425 Rajdhani Express prior to 01:15 hrs',
      'Freight BOXN-8892 routed via Down loop without corridor stoppage',
      'Morning 12004 Shatabdi Express cleared at 05:15 with 15-min safety buffer',
      'Traction 25kV power cut isolated only to Sub-Sector LDH-East'
    ],
    reasoning: [
      'Low train traffic density window between 01:30 and 05:00 hrs (average headway 48 mins).',
      'Compatible spatial activity: Track tamping and overhead OHE dropper adjustment share parallel track spans without mechanical hazard.',
      'S&T point machine calibration can proceed concurrently during OHE power block.',
      'Corridor throughput gain: +32.4% over 3 separate weekly block interruptions.'
    ]
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: 'AUD-01', time: '09:15:22', user: 'Ananya Deshmukh (Sr. DOM)', action: 'Triggered AI Coordination Optimization', module: 'Block Planning', status: 'Success' },
    { id: 'AUD-02', time: '08:02:11', user: 'Dr. Priya Raghavan (Sr. DSTE)', action: 'Submitted Maintenance Request REQ-SNT-3014', module: 'S&T Module', status: 'Submitted' },
    { id: 'AUD-03', time: '07:18:40', user: 'Gurpreet Singh (DEE/TRD)', action: 'Submitted OHE Block Request REQ-TRD-2089', module: 'Traction TRD', status: 'Submitted' },
    { id: 'AUD-04', time: '06:35:04', user: 'Suresh Chandra (Sr. DEN)', action: 'Logged USFD Track Defect & Raised REQ-ENG-1042', module: 'Civil Engineering', status: 'Submitted' }
  ]);

  // Auth switch
  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setCurrentUser(DEMO_USERS[roleKey]);
      addAuditLog(`Switched active operator view to ${DEMO_USERS[roleKey].name} (${DEMO_USERS[roleKey].department})`, 'Authentication');
    }
  };

  const addAuditLog = (action, module) => {
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString('en-GB'),
      user: `${currentUser.name} (${currentUser.role})`,
      action,
      module,
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Create new request
  const createRequest = (newReq) => {
    const id = `REQ-${newReq.department.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const reqWithMeta = {
      ...newReq,
      id,
      status: 'Submitted',
      reportedDate: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setRequests(prev => [reqWithMeta, ...prev]);
    
    // Add notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: `New Block Request: ${id}`,
      dept: newReq.department,
      time: 'Just now',
      unread: true,
      severity: newReq.severity === 'Critical' ? 'critical' : 'warning',
      message: `${newReq.issue} in section ${newReq.section}`
    };
    setNotifications(prev => [newNotif, ...prev]);
    addAuditLog(`Created block request ${id} (${newReq.department})`, 'Maintenance');
    return id;
  };

  // Approve AI Plan
  const approveAiPlan = () => {
    setAiPlanStatus('APPROVED');
    setApprovedPlanDetails({
      approvedAt: new Date().toLocaleTimeString('en-GB'),
      approvedBy: currentUser.name,
      planId: activeMegaPlan.planId,
      section: activeMegaPlan.section,
      window: activeMegaPlan.window,
      date: activeMegaPlan.date
    });

    // Update merged requests to Approved
    setRequests(prev => prev.map(r => {
      if (activeMegaPlan.requestsMerged.includes(r.id)) {
        return { ...r, status: 'Approved & Scheduled', scheduledWindow: activeMegaPlan.window };
      }
      return r;
    }));

    // Add high-priority notification
    const approvedNotif = {
      id: `NOTIF-APP-${Date.now()}`,
      title: 'Mega Block Schedule APPROVED & PUBLISHED',
      dept: 'Operating Control',
      time: 'Just now',
      unread: true,
      severity: 'success',
      message: `Manager approved combined 3.5h window (${activeMegaPlan.window}) for LDH-JUC line. Civil, TRD, and S&T teams dispatched.`
    };
    setNotifications(prev => [approvedNotif, ...prev]);
    addAuditLog(`Approved & Published AI Mega Block ${activeMegaPlan.planId}`, 'Block Planning');
  };

  // Reject AI Plan
  const rejectAiPlan = () => {
    setAiPlanStatus('REJECTED');
    addAuditLog(`Returned AI Recommendation ${activeMegaPlan.planId} for re-simulation`, 'Block Planning');
  };

  // Re-run AI simulation
  const runAiOptimization = () => {
    setAiPlanStatus('GENERATING');
    setTimeout(() => {
      setAiPlanStatus('PENDING_REVIEW');
      addAuditLog('Completed multi-department conflict re-optimization calculation', 'AI Engine');
    }, 900);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <RailGenContext.Provider value={{
      currentUser,
      switchRole,
      requests,
      createRequest,
      defectsCivil,
      faultsTrd,
      faultsSnt,
      notifications,
      markAllNotificationsRead,
      trains,
      activeMegaPlan,
      aiPlanStatus,
      approvedPlanDetails,
      approveAiPlan,
      rejectAiPlan,
      runAiOptimization,
      auditLogs,
      addAuditLog
    }}>
      {children}
    </RailGenContext.Provider>
  );
}

export function useRailGen() {
  const context = useContext(RailGenContext);
  if (!context) {
    throw new Error('useRailGen must be used within a RailGenProvider');
  }
  return context;
}
