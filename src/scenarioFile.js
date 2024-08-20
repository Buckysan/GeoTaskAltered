let scenarios2 = [
  {
    "ID": 1,
    "True Condition": "Cryoglobulinemia",
    "Prompt": "Patient is a 38 year old male presented with swelling of his face and extremities for 6 weeks.",
    "Suspected": "Your colleague has been handling the patient with a working hypothesis of Anaphylaxis.",
    "Patient History": {
        "Present Illness History": {
            "Output": "The patient had a long history of intravenous drug abuse. Six months prior to admission, he had enrolled in a Methadone maintenance program, and had stopped using intravenous drugs. At that time, he was found to be hypertensive, and was started on hydrochlorothiazide. Six weeks prior to admission, he noted painless swelling of his face, and upper and lower extremities. He gained 20 lbs in weight. He denied fever, rash, sore throat, arthralgias, myalgias, Raynaud's phenomenon, chest pain, cough, shortness of breath, hematuria, or declining urine output.",
            "Duration": 20
        },
        "Past Medical History": {
            "Output": "No prior history of cardiac, hepatic, or renal disease.",
            "Duration": 60
        },
        "Medication": {
            "Output": "Methadone, hydrochlorothiazide.",
            "Duration": 20
        },
        "Allergies": {
            "Output": "None Known",
            "Duration": 45
        },
        "Family History": {
            "Output": "Noncontributory",
            "Duration": 30
        },
        "Social History": {
            "Output": "He is married and has two children. He works as a factory clerk. He had a past history of intravenous use of cocaine and brown heroin, and had shared needles. He does not use tobacco or alcohol.",
            "Duration": 30
        }
    },
    "Physical Examination": {
        "Take Pulse": {
            "Output": "100",
            "Duration": 1200
        },
        "Measure Blood Pressure": {
            "Output": "175/110 mmHG",
            "Duration": 300
        },
        "Assess Respiratory Rate": {
            "Output": "17/min",
            "Duration": 900
        },
        "Auscultate Lungs": {
            "Output": "The lungs are clear.",
            "Duration": 0
        },
        "Auscultate the Heart": {
            "Output": "Cardiac examination revealed a normal apical impulse, and normal S1 and S2, without S3 or S4 gallop. There was a II/VI systolic ejection murmur at the apex, without radiation.",
            "Duration": 1500
        },
        "Assess Eyes": {
            "Output": "The conjunctivae were pink. The sclerae were anicteric. The pupils were equal, round, and reactive to light and accommodation.",
            "Duration": 1800
        },
        "Measure Temperature": {
            "Output": "37.7 degrees celsius",
            "Duration": 800
        },
        "Abdomen Examination": {
            "Output": "The abdomen was soft and non-tender, with normoactive bowel sounds. The liver was 11 cm in the midclavicular line. The spleen was not enlarged.",
            "Duration": 400
        },
        "Rectal Examination": {
            "Output": "Rectal examination showed no tenderness or masses; the stool was guaiac negative.",
            "Duration": 900
        },
        "Neck/Throat Examination": {
            "Output": "The oropharynx was benign. The neck was supple. There was no jugular venous distention. The thyroid gland was normal in size. There was no lymphadenopathy.",
            "Duration": 300
        },
        "Assess Head": {
            "Output": "The head was normocephalic and atraumatic.",
            "Duration": 200
        },
        "Neurologic Exam Record": {
            "Output": "The neurologic examination was normal.",
            "Duration": 400
        },
        "Assess Extremities": {
            "Output": "The upper and lower extremities showed 4+ pitting edema; no rash or purpuric lesions were seen.",
            "Duration": 400
        },
    },
    "Generalised Testing": {
        "CBC - Hgb": {
            "Output": "12.0 (Normal: 14.0-18.0 g/dl)",
            "Duration": 20
        },
        "CBC - Hct": {
            "Output": "35 (Normal: 42-52%)",
            "Duration": 20
        },
        "CBC - MCV": {
            "Output": "88 (Normal: 84-99 fl)",
            "Duration": 20
        },
        "CBC - WBC": {
            "Output": "11.7 (Normal: 4.8-10.8 x 10^9/L)",
            "Duration": 20
        },
        "CBC - Neut": {
            "Output": "78 (Normal: 40-70%)",
            "Duration": 20
        },
        "CBC - Lymphs": {
            "Output": "19 (Normal: 25-45%)",
            "Duration": 20
        },
        "CBC - Platelet Count": {
            "Output": "350 (Normal: 150-400 x 10^9/l)",
            "Duration": 20
        },
        "Chemistries - Sodium": {
            "Output": "137 (Normal: 135-149 mmol/l)",
            "Duration": 20
        },
        "Chemistries - Potassium": {
            "Output": "2.7 (Normal: 3.5-5.3 mmol/l)",
            "Duration": 20
        },
        "Chemistries - Chloride": {
            "Output": "98 (Normal: 98-108 mmol/l)",
            "Duration": 20
        },
        "Chemistries - CO2": {
            "Output": "28 (Normal: 24-32 mmol/l)",
            "Duration": 20
        },
        "Chemistries - BUN": {
            "Output": "23 (Normal: 6-20 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Creatinine": {
            "Output": "2.0 (Normal: 0.5-1.5 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Glucose": {
            "Output": "90 (Normal: 70-110 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Protein Total": {
            "Output": "7.3 (Normal: 6.0-8.0 g/dl)",
            "Duration": 20
        },
        "Chemistries - Albumin": {
            "Output": "2.4 (Normal: 3.6-50 g/dl)",
            "Duration": 20
        },
        "Chemistries - AST (SGOT)": {
            "Output": "30 (Normal: 0-50 U/L)",
            "Duration": 20
        },
        "Chemistries - ALP": {
            "Output": "274 (Normal: 40-125 U/L)",
            "Duration": 20
        }
    },
    "Specialised Testing": {
        "Chest X-Ray": {
            "Output": "Normal heart and lungs",
            "Duration": 60
        },
        "Urinalysis": {
            "Output": "Specific gravity 1.030, 3+ protein; microscopic examination showed 40-50 RBCs, 10-15 WBCs, many granular and hyaline casts, and oval fat bodies, but no red cell casts.",
            "Duration": 60
        },
        "Serum Protein and Immuno-Electrophoresis": {
            "Output": "Alpha-1 globulin of 6.7 (normal 2.5-4.5 ), beta globulin 14.1 (normal 8-12), and gamma globulin 25.4 (normal 10-18). IgM 220 (normal 50-350) with IgM kappa monoclonal protein detected; IgG and IgA were normal.",
            "Duration": 60
        },
        "ECG/EKG": {
            "Output": "Sinus tachycardia with left ventricular hypertrophy, and nonspecific ST-T wave changes",
            "Duration": 60
        },
        "Abdominal CT Scan": {
            "Output": "Aortocaval adenopathy and bilaterally enlarged kidneys.",
            "Duration": 60
        },
        "Sputum Culture/Grain Stain": {
            "Output": "Results were inconclusive.",
            "Duration": 60
        },
        "ANA/Rheumatoid Factor": {
            "Output": "ANA was negative; rheumatoid factor was positive.",
            "Duration": 180
        },
        "Bone and Joint Radiographs": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Coomb’s Test (AGT)": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Blood Smear": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Haptoglobin": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "HIV Antibody": {
            "Output": "Negative",
            "Duration": 180
        },
        "PPD/Anergy Battery": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Blood Cultures": {
            "Output": "Two blood cultures showed no growth.",
            "Duration": 180
        },
        "Arterial Blood Gas on Room Air": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Urine Culture and Protein Electrophoresis": {
            "Output": "Total volume of 2,250 ml, protein of 6.9 gm. Negative for Bence-Jones protein.",
            "Duration": 180
        }
    },
  },
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
    {"ID": 2,
    "True Condition": "Polymyalgia Rheumatica",
    "Prompt": "Patient is a 65 year old woman complained of pain in her shoulders, knees, and neck.",
    "Suspected": "Your colleague has been handling the patient with a working hypothesis of Anaphylaxis.",
    "Patient History": {
        "Present Illness History": {
            "Output": "The patient had a long history of arthritis for which she was treated for seven years with non-steroidal anti-inflammatory drugs and dexamethasone. Nine months before her admission she started seeing a new doctor who tapered her steroids over four to six months. In the three weeks prior to admission her joint pain involving the shoulders, knees, and neck became much worse. She mentioned PIP (proximal interphalangeal) joint pain as well. She complained that she could hardly move, and had morning stiffness that improved after a hot bath. She denied joint swelling or redness, but complained of decreased range of motion in her knees and shoulders. She applied Ben Gay occasionally and started using a cane to help with ambulation. She had no rashes, Raynaud phenomenon, sweats, headaches or muscle tenderness. She did not notice any weakness. She also complained of anorexia and had eaten poorly for a long time, but for the previous three weeks had taken only a few mouthfuls at a time. She had been drinking Ensure for two weeks. She denied abdominal pain, trouble swallowing, nausea, vomiting or change in her bowel habits. Her weight had fallen from 158 lbs. to 118 lbs. over the past year. Over the same period of time her Hgb had fell from 13.6 to 8.0 g/dl. After starting on iron her Hgb rose to 10 g/dl.",
            "Duration": 20
        },
        "Past Medical History": {
            "Output": "She had a multinodular goiter detected a year prior to admission. She was not on thyroid hormone. She had never been hospitalized and had had no operations. She did have a history of renal insufficiency with a creatinine of 2.0 mg/dl.",
            "Duration": 60
        },
        "Medication": {
            "Output": "She had a past history of hypertension and was once on hydrochlorothiazide and then Lasix, but is now on no medication. ",
            "Duration": 20
        },
        "Allergies": {
            "Output": "None Known",
            "Duration": 45
        },
        "Family History": {
            "Output": "No relevant family history",
            "Duration": 30
        },
        "Social History": {
            "Output": "She is married and lives with her husband and a grandson. She does not smoke or drink. She lives on social security.",
            "Duration": 30
        }
    },
    "Physical Examination": {
        "Take Pulse": {
            "Output": "84",
            "Duration": 1200
        },
        "Measure Blood Pressure": {
            "Output": "102/68 mmHG",
            "Duration": 300
        },
        "Assess Respiratory Rate": {
            "Output": "22/min",
            "Duration": 900
        },
        "Auscultate Lungs": {
            "Output": "No breast masses. The lungs are clear.",
            "Duration": 0
        },
        "Auscultate the Heart": {
            "Output": "The heart sounds were normal without murmurs or gallops.",
            "Duration": 1500
        },
        "Assess Eyes": {
            "Output": "She had cataracts bilaterally which made visualization of the retina difficult. The pupils were equal, round, and reactive to light. The conjunctiva were pale. Extraocular movements were intact.",
            "Duration": 1800
        },
        "Measure Temperature": {
            "Output": "36.7 degrees celsius",
            "Duration": 800
        },
        "Abdomen Examination": {
            "Output": "The abdomen was soft and non-tender with no masses or organomegaly. There were normal bowel sounds.",
            "Duration": 400
        },
        "Rectal Examination": {
            "Output": "There were no rectal masses and the stool was guaiac negative.",
            "Duration": 900
        },
        "Neck/Throat Examination": {
            "Output": "She was edentulous and had no oropharyngeal lesions. The tympanic membranes were normal. She had good range of motion in the neck. There was no jugular venous distention. The right lobe of the thyroid was enlarged with a question of a nodule.",
            "Duration": 300
        },
        "Assess Head": {
            "Output": "The cranial nerves were intact. Sensation was intact to position, light touch and vibration.",
            "Duration": 200
        },
        "Neurologic Exam Record": {
            "Output": "She was able to abduct her shoulders only to 90 degrees and had decreased internal and external shoulder rotation. There were bilateral varus deformities at the knees with palpable crepitus and flexion only to 90 degrees. There was slightly diminished strength throughout but more notable at the deltoids and hip flexors. She could not stand from a sitting position without using her hands. She was alert and oriented.  The deep tendon reflexes were 3+ and symmetric, though absent at the ankles. The Babinski's were down going. There was no muscle tenderness. There was no joint tenderness, no effusions, and no synovial thickening. She did have Heberden's nodes bilaterally.",
            "Duration": 400
        },
        "Assess Extremities": {
            "Output": "There was no peripheral edema.",
            "Duration": 400
        },
    },
    "Generalised Testing": {
        "CBC - Hgb": {
            "Output": "9.8 (Normal: 14.0-18.0 g/dl)",
            "Duration": 20
        },
        "CBC - Hct": {
            "Output": "30 (Normal: 42-52%)",
            "Duration": 20
        },
        "CBC - MCV": {
            "Output": "83 (Normal: 84-99 fl)",
            "Duration": 20
        },
        "CBC - WBC": {
            "Output": "7.5 (Normal: 4.8-10.8 x 10^9/L)",
            "Duration": 20
        },
        "CBC - Neut": {
            "Output": "69 (Normal: 40-70%)",
            "Duration": 20
        },
        "CBC - Lymphs": {
            "Output": "21 (Normal: 25-45%)",
            "Duration": 20
        },
        "CBC - Platelet Count": {
            "Output": "582 (Normal: 150-400 x 10^9/l)",
            "Duration": 20
        },
        "Chemistries - Sodium": {
            "Output": "139 (Normal: 135-149 mmol/l)",
            "Duration": 20
        },
        "Chemistries - Potassium": {
            "Output": "4.1 (Normal: 3.5-5.3 mmol/l)",
            "Duration": 20
        },
        "Chemistries - Chloride": {
            "Output": "106 (Normal: 98-108 mmol/l)",
            "Duration": 20
        },
        "Chemistries - CO2": {
            "Output": "23 (Normal: 24-32 mmol/l)",
            "Duration": 20
        },
        "Chemistries - BUN": {
            "Output": "25 (Normal: 6-20 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Creatinine": {
            "Output": "2.0 (Normal: 0.5-1.5 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Glucose": {
            "Output": "110 (Normal: 70-110 mg/dl)",
            "Duration": 20
        },
        "Chemistries - Protein Total": {
            "Output": "7.2 (Normal: 6.0-8.0 g/dl)",
            "Duration": 20
        },
        "Chemistries - Albumin": {
            "Output": "3.7 (Normal: 3.6-50 g/dl)",
            "Duration": 20
        },
        "Chemistries - AST (SGOT)": {
            "Output": "8 (Normal: 0-50 U/L)",
            "Duration": 20
        },
        "Chemistries - ALP": {
            "Output": "81 (Normal: 40-125 U/L)",
            "Duration": 20
        }
    },
    "Specialised Testing": {
        "Chest X-Ray": {
            "Output": "Small pleural effusion, mild tracheal deviation to the left and a question of a large thyroid. There were no pulmonary infiltrates.",
            "Duration": 60
        },
        "Urinalysis": {
            "Output": "Trace protein, no glucose, 3+ Hgb, 10-15 WBC's per HPF, >100 RBC's per HPF, 10-15 squamous epithelial cells.",
            "Duration": 60
        },
        "Serum Protein and Immuno-Electrophoresis": {
            "Output": "No significant abnormalities.",
            "Duration": 60
        },
        "ECG/EKG": {
            "Output": "Normal",
            "Duration": 60
        },
        "Abdominal CT Scan": {
            "Output": "Results were inconclusive.",
            "Duration": 60
        },
        "Sputum Culture/Grain Stain": {
            "Output": "Results were inconclusive.",
            "Duration": 60
        },
        "ANA/Rheumatoid Factor": {
            "Output": "Negative for both",
            "Duration": 180
        },
        "Bone and Joint Radiographs": {
            "Output": "Evidence of osteoarthritis at multiple joints. The patient underwent flexible sigmoidoscopy and was noted to have a 5 mm polyp at 30 cm. A single column barium enema was normal, though a right renal calculus was detected. An upper GI was notable for an active duodenal bulb ulcer. An EMG was non-diagnostic but showed changes of irritation in proximal muscles suggestive of an inflammatory myopathy.",
            "Duration": 180
        },
        "Coomb’s Test (AGT)": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Blood Smear": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Haptoglobin": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "HIV Antibody": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "PPD/Anergy Battery": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Blood Cultures": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Arterial Blood Gas on Room Air": {
            "Output": "Results were inconclusive.",
            "Duration": 180
        },
        "Urine Culture and Protein Electrophoresis": {
            "Output": "Negative urine culture and normal electrophoresis.",
            "Duration": 180
        }
    }
    }
]
let diagnoses2 = [
"Unstable Ventricular Tachycardia",
"Stable Ventricular Tachycardia",
"Tachyarrhythmia Absoluta in Atrial Fibrillation",
"Pulmonary Artery Embolism",
"Acute Exacerbated COPD",
"Hypertensive Pulonary Edema",
"Pnemonia",
"Opiate Overdose",
"Spontaneous Pneumothorax",
"Aspiration",
"Paroxysmal Supraventricular Tachycardia",
"Anaphylaxis",
"Posterior Myocardial Infarction",
"Endocarditis",
"AV Block III",
"Thoracic Aortic Aneurysm",
"Subarachniodal Hemorrhage",
"Apoplectic Insult",
"Intracerebral Hemorrhage",
"Hypoglycemic Shock"
]
