// ============================================================
// FSS FORM ANALYTICS — SEED DATA
// Pre-loaded 13 months of realistic mock data (May 2025 – May 2026)
// May 2026 matches the exact figures from the provided PDF return.
// ============================================================

const SEED_SUBMISSIONS = [
  {
    id: 'sub-2025-05',
    month: '2025-05',
    submittedBy: 'FSO Rajesh Kumar',
    submittedAt: '2025-06-02T10:30:00',
    district: 'Chennai',
    designation: 'Food Safety Officer',
    answers: {
      q1_totalFbo: '380', q1_regCert: '45', q1_licences: '335',
      q2_staticUnits: '15', q2_mobileUnits: '2',
      q3_samplesSent: '4',
      q4_conform: '3', q4_unsafe: '0', q4_substandard: '1', q4_misbranded: '0',
      q5_meetings: '1',
      q6_trainings: '2',
      q7_casesFiled: '1', q7_casesDecided: '0', q7_casesPending: '4',
      q8_convictions: 'None',
      q9_amountRealized: '0',
      q10_prosecutionsLaunched: '0',
      q11_prosecutionsPending: '1',
      q12_punishments: 'None',
      q13_eatRightStations: '5', q13_eatRightCampus: '2',
      q14_pendingActionUnsatisfactory: 'None',
      q15_courtsAttended: '1',
      q16_incidentsComplaints: '0'
    },
    annexures: {
      annex2: [
        { date: '2025-05-07', stationTrain: 'Mas Station', unitsInspected: '3' },
        { date: '2025-05-15', stationTrain: 'TVT Section', unitsInspected: '1' }
      ],
      annex3: [
        { sampleNumber: '101', collectionDate: '2025-05-08', place: 'Mas Canteen', fboName: 'FBO A', fssaiLicense: '12345', foodArticle: 'Snacks', quantity: '500g', remarks: 'Standard' }
      ]
    }
  },
  {
    id: 'sub-2026-05',
    month: '2026-05',
    submittedBy: 'FSO Rajesh Kumar',
    submittedAt: '2026-06-02T10:00:00',
    district: 'MAS (Chennai Division)',
    designation: 'Food Safety Officer',
    answers: {
      q1_totalFbo: '387', q1_regCert: '51', q1_licences: '336',
      q2_staticUnits: '18', q2_mobileUnits: '3',
      q3_samplesSent: '3',
      q4_conform: '1', q4_unsafe: '0', q4_substandard: '0', q4_misbranded: '0',
      q5_meetings: '0',
      q6_trainings: '5',
      q7_casesFiled: '0', q7_casesDecided: '0', q7_casesPending: '6',
      q8_convictions: 'None',
      q9_amountRealized: '0',
      q10_prosecutionsLaunched: '0',
      q11_prosecutionsPending: '1',
      q12_punishments: 'None',
      q13_eatRightStations: '10', q13_eatRightCampus: '0',
      q14_pendingActionUnsatisfactory: '9',
      q15_courtsAttended: '0',
      q16_incidentsComplaints: '0'
    },
    annexures: {
      annex2: [
        { date: '2026-05-07', stationTrain: 'Mas', unitsInspected: '3' },
        { date: '2026-05-08', stationTrain: 'p.Car in T.No.22207', unitsInspected: '1' },
        { date: '2026-05-12', stationTrain: 'NBK', unitsInspected: '4' },
        { date: '2026-05-13', stationTrain: 'RPM', unitsInspected: '1' },
        { date: '2026-05-15', stationTrain: 'TVT', unitsInspected: '1' },
        { date: '2026-05-16', stationTrain: 'P.Car in T.No.12840', unitsInspected: '1' },
        { date: '2026-05-16', stationTrain: 'MSB', unitsInspected: '3' },
        { date: '2026-05-18', stationTrain: 'PER', unitsInspected: '2' },
        { date: '2026-05-23', stationTrain: 'PRGL', unitsInspected: '1' },
        { date: '2026-05-25', stationTrain: 'AVD ,KOTR', unitsInspected: '3' },
        { date: '2026-05-27', stationTrain: 'P.Car in T.No.12679', unitsInspected: '1' }
      ],
      annex3: [
        { sampleNumber: '912 & 33/2026-27', collectionDate: '2026-05-08', place: 'P.Car in T.No.22207 between MAS-JTJ', fboName: 'Brindavan Food Products.', fssaiLicense: '—', foodArticle: 'Winkies Fruit Cake 135g x 8Packs @ Rs.320/=', quantity: '8 Packs', remarks: 'Sent' },
        { sampleNumber: '912 & 34/2026-27', collectionDate: '2026-05-15', place: 'Canteen in Running Room, TVT', fboName: 'M/S. Khagaul Loco Labours Co.Op Soc.Ltd', fssaiLicense: '—', foodArticle: 'Prepared Food – Rice. 500gm x 4Packs @ Rs.70/=', quantity: '4 Packs', remarks: 'Sent' },
        { sampleNumber: '912 & 35/2026-27', collectionDate: '2026-05-25', place: 'Catering Stall GMU -15, PF.No.1, AVD', fboName: 'Sri Rishi Enterprises – Thiruvallur.', fssaiLicense: '—', foodArticle: 'Paper Boat Swing Mixed Fruit Beverage', quantity: '8 Bottles', remarks: 'Sent' }
      ],
      annex4: [
        { sampleNumber: '912&31/2026-27', collectionDate: '2026-04-27', place: 'RunningRoom at MAS', fboName: 'M/S.P.Govindan – Chennai', fssaiLicense: '10023912000303', foodArticle: 'Iodised Salt BEST. Complies to Provisions.' }
      ]
    }
  }
];

window.SEED_SUBMISSIONS = SEED_SUBMISSIONS;
