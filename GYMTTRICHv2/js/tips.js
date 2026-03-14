import { getUser } from './db.js';

// ==================== TIPS DATABASE ====================

const TIPS_DATABASE = {
    // ECTOMORPH TIPS
    Ectomorph: {
        Hypertrophy: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Ectomorph Hypertrophy',
                tips: [
                    '<strong>Focus on Compound Lifts:</strong> Prioritize multi-joint movements (Squats, Deadlifts, Bench, Rows) to stimulate maximum muscle fibers.',
                    '<strong>Progressive Overload:</strong> You must increase weight, reps, or improve form every session. Strength gains drive size gains.',
                    '<strong>Volume Management:</strong> Avoid excessive cardio. Keep sessions intense but under 60-75 minutes.',
                    '<strong>Rest:</strong> Muscles grow during rest, not training. Aim for at least 48h rest between hitting the same muscle group.',
                    '<strong>Rep Range:</strong> Focus on 6-12 reps for hypertrophy. Lower reps (3-5) for strength phases.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Ectomorph Hypertrophy',
                tips: [
                    '<strong>Caloric Surplus:</strong> You need to eat MORE than you burn. Add 300-500 kcal above maintenance.',
                    '<strong>Protein:</strong> Aim for 1.8g to 2.2g per kg of bodyweight. Higher end for lean gains.',
                    '<strong>Carbs are Fuel:</strong> Don\'t fear carbs. They spare protein for muscle building and fuel intense workouts.',
                    '<strong>Meal Frequency:</strong> Eat 4-6 meals per day to maintain caloric surplus without feeling stuffed.',
                    '<strong>Pre/Post Workout:</strong> Consume carbs + protein before and after training for optimal recovery.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> Upper/Lower Split (4 days) or Push/Pull/Legs (6 days).',
                    '<strong>Sets:</strong> 12-20 weekly sets per muscle group for hypertrophy.',
                    '<strong>Rest Between Sets:</strong> 2-3 minutes for compounds, 60-90s for accessories.',
                    '<strong>Deload:</strong> Every 4-6 weeks, reduce volume by 40% to allow full recovery.'
                ]
            }
        },
        Recomposition: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Ectomorph Recomposition',
                tips: [
                    '<strong>Strength Priority:</strong> Focus on getting stronger in the 5-8 rep range.',
                    '<strong>Compound Movements:</strong> Squat, Deadlift, Bench, Overhead Press, Rows are essential.',
                    '<strong>Minimal Cardio:</strong> 1-2 HIIT sessions per week max. Preserve muscle mass.',
                    '<strong>Progressive Overload:</strong> Track every workout and aim to beat previous performance.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Ectomorph Recomposition',
                tips: [
                    '<strong>Maintenance Calories:</strong> Eat at maintenance or slight deficit (-200 kcal).',
                    '<strong>High Protein:</strong> 2.0-2.4g per kg bodyweight to preserve muscle.',
                    '<strong>Carb Cycling:</strong> Higher carbs on training days, lower on rest days.',
                    '<strong>Nutrient Timing:</strong> Most carbs around training for performance and recovery.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> Full Body 3x/week or Upper/Lower 4x/week.',
                    '<strong>Sets:</strong> 10-15 weekly sets per muscle group.',
                    '<strong>Intensity:</strong> Train close to failure (1-2 RIR) on main lifts.'
                ]
            }
        },
        'Fat loss': {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Ectomorph Fat Loss',
                tips: [
                    '<strong>Maintain Strength:</strong> Keep lifting heavy to preserve muscle mass.',
                    '<strong>Compound Focus:</strong> Stick to big movements for maximum calorie burn.',
                    '<strong>Add Cardio Wisely:</strong> 2-3 sessions of LISS or HIIT per week.',
                    '<strong>Don\'t Overtrain:</strong> Recovery is harder in a deficit. Listen to your body.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Ectomorph Fat Loss',
                tips: [
                    '<strong>Moderate Deficit:</strong> -300 to -500 kcal below maintenance. Don\'t go too aggressive.',
                    '<strong>Very High Protein:</strong> 2.2-2.6g per kg to preserve muscle in deficit.',
                    '<strong>Strategic Carbs:</strong> Keep carbs around training, reduce on rest days.',
                    '<strong>Track Everything:</strong> Weigh food and track calories religiously.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 3-4 strength sessions + 2-3 cardio sessions.',
                    '<strong>Volume:</strong> Reduce volume by 20-30% compared to surplus.',
                    '<strong>Intensity:</strong> Keep weight heavy, reduce sets if needed.'
                ]
            }
        }
    },

    // MESOMORPH TIPS
    Mesomorph: {
        Hypertrophy: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Mesomorph Hypertrophy',
                tips: [
                    '<strong>High Volume:</strong> You can handle more volume than ectomorphs. 15-25 sets per muscle group.',
                    '<strong>Variety:</strong> Mix heavy compounds with isolation work for complete development.',
                    '<strong>Moderate Rest:</strong> 60-90 seconds between sets for hypertrophy.',
                    '<strong>Train to Failure:</strong> Push close to failure on most sets for maximum growth.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Mesomorph Hypertrophy',
                tips: [
                    '<strong>Moderate Surplus:</strong> +200-400 kcal above maintenance.',
                    '<strong>Balanced Macros:</strong> 30% protein, 40% carbs, 30% fats.',
                    '<strong>Protein:</strong> 1.6-2.0g per kg bodyweight.',
                    '<strong>Watch Fat Gain:</strong> Monitor weekly and adjust if gaining too fast.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> PPL 6x/week or Upper/Lower 4-5x/week.',
                    '<strong>Rep Range:</strong> Mix 6-8 reps (strength) with 10-15 reps (hypertrophy).',
                    '<strong>Periodization:</strong> Cycle between strength and hypertrophy blocks.'
                ]
            }
        },
        Recomposition: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Mesomorph Recomposition',
                tips: [
                    '<strong>Strength + Hypertrophy:</strong> Combine heavy compounds with moderate rep accessories.',
                    '<strong>Moderate Volume:</strong> 12-18 sets per muscle group weekly.',
                    '<strong>Add Conditioning:</strong> 2-3 HIIT or circuit training sessions per week.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Mesomorph Recomposition',
                tips: [
                    '<strong>Maintenance Calories:</strong> Eat at maintenance for slow recomp.',
                    '<strong>High Protein:</strong> 2.0-2.2g per kg bodyweight.',
                    '<strong>Carb Timing:</strong> Most carbs around training, lower on rest days.',
                    '<strong>Flexible Dieting:</strong> 80/20 rule - 80% whole foods, 20% flexibility.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 4-5 strength sessions + 2-3 conditioning.',
                    '<strong>Intensity:</strong> Heavy main lifts, moderate accessories.',
                    '<strong>Recovery:</strong> 1-2 full rest days per week.'
                ]
            }
        },
        'Fat loss': {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Mesomorph Fat Loss',
                tips: [
                    '<strong>Maintain Intensity:</strong> Keep weights heavy to preserve muscle.',
                    '<strong>Add Cardio:</strong> 3-4 sessions of HIIT or steady-state per week.',
                    '<strong>Circuit Training:</strong> Combine weights with cardio for efficiency.',
                    '<strong>Active Recovery:</strong> Walking, swimming on rest days.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Mesomorph Fat Loss',
                tips: [
                    '<strong>Moderate Deficit:</strong> -400 to -600 kcal below maintenance.',
                    '<strong>High Protein:</strong> 2.0-2.4g per kg to preserve muscle.',
                    '<strong>Lower Carbs:</strong> Reduce carbs on non-training days.',
                    '<strong>Refeed Days:</strong> 1 higher carb day per week to boost metabolism.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 3-4 strength + 3-4 cardio sessions.',
                    '<strong>Volume:</strong> Reduce volume by 20-30% from surplus.',
                    '<strong>Supersets:</strong> Use supersets to increase calorie burn.'
                ]
            }
        }
    },

    // ENDOMORPH TIPS
    Endomorph: {
        Hypertrophy: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Endomorph Hypertrophy',
                tips: [
                    '<strong>High Volume + Intensity:</strong> You can handle and need high volume. 16-25 sets per muscle.',
                    '<strong>Shorter Rest:</strong> 45-90 seconds between sets to keep heart rate elevated.',
                    '<strong>Add Cardio:</strong> 2-3 sessions per week to manage body fat.',
                    '<strong>Supersets & Circuits:</strong> Increase calorie burn during training.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Endomorph Hypertrophy',
                tips: [
                    '<strong>Small Surplus:</strong> +200-300 kcal above maintenance. Easy to overshoot.',
                    '<strong>Lower Carbs:</strong> 30% protein, 30% carbs, 40% fats works well.',
                    '<strong>Protein:</strong> 1.8-2.2g per kg bodyweight.',
                    '<strong>Carb Timing:</strong> Most carbs post-workout only.',
                    '<strong>Track Closely:</strong> Weigh weekly and adjust quickly if gaining too much fat.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 5-6 training days per week.',
                    '<strong>Mix Modalities:</strong> Strength + hypertrophy + conditioning.',
                    '<strong>Active Lifestyle:</strong> Walk 8-10k steps daily outside gym.'
                ]
            }
        },
        Recomposition: {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Endomorph Recomposition',
                tips: [
                    '<strong>Strength Priority:</strong> Heavy compounds to build/maintain muscle.',
                    '<strong>High Activity:</strong> Lift 4-5x/week + cardio 3-4x/week.',
                    '<strong>HIIT Effective:</strong> High-intensity intervals burn fat while preserving muscle.',
                    '<strong>Stay Active:</strong> 10k+ steps daily is crucial.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Endomorph Recomposition',
                tips: [
                    '<strong>Slight Deficit:</strong> -200 to -300 kcal below maintenance.',
                    '<strong>Very High Protein:</strong> 2.2-2.6g per kg bodyweight.',
                    '<strong>Low Carb Effective:</strong> 100-150g carbs on training days, 50-100g on rest.',
                    '<strong>Healthy Fats:</strong> Don\'t fear fats - they help with satiety and hormones.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 4-5 strength + 3-4 cardio sessions.',
                    '<strong>Intensity:</strong> Train hard, recover smart.',
                    '<strong>Sleep:</strong> 7-9 hours crucial for fat loss and recovery.'
                ]
            }
        },
        'Fat loss': {
            training: {
                icon: 'ph-lightning',
                title: 'Training for Endomorph Fat Loss',
                tips: [
                    '<strong>Maintain Muscle:</strong> Keep lifting heavy on main compounds.',
                    '<strong>High Cardio Volume:</strong> 4-5 cardio sessions per week.',
                    '<strong>NEAT Matters:</strong> Walk 10-15k steps daily. Non-exercise activity is key.',
                    '<strong>Metabolic Conditioning:</strong> Circuits, complexes, HIIT for fat burning.'
                ]
            },
            nutrition: {
                icon: 'ph-fork-knife',
                title: 'Nutrition for Endomorph Fat Loss',
                tips: [
                    '<strong>Aggressive Deficit:</strong> -500 to -750 kcal below maintenance.',
                    '<strong>Very High Protein:</strong> 2.4-2.8g per kg to preserve muscle in deep deficit.',
                    '<strong>Lower Carbs:</strong> 50-100g on training days, <50g on rest days.',
                    '<strong>Intermittent Fasting:</strong> Can help with calorie control (optional).',
                    '<strong>Refeed Weekly:</strong> 1 higher carb day to prevent metabolic adaptation.'
                ]
            },
            routine: {
                icon: 'ph-barbell',
                title: 'Routine Structure',
                tips: [
                    '<strong>Frequency:</strong> 3-4 strength + 4-5 cardio sessions.',
                    '<strong>Volume:</strong> Moderate volume, high intensity.',
                    '<strong>Recovery:</strong> Prioritize sleep and stress management.'
                ]
            }
        }
    }
};

// ==================== RENDER FUNCTION ====================

async function renderPersonalizedTips() {
    const users = await getUser();
    const user = users?.[0];

    const container = document.querySelector('.recommendations-grid');

    if (!container) return;

    // Default to Ectomorph + Hypertrophy if no user data
    const bodyType = user?.body_type || 'Ectomorph';
    const goal = user?.goal || 'Hypertrophy';

    console.log('Rendering tips for:', { bodyType, goal });

    const tips = TIPS_DATABASE[bodyType]?.[goal];

    if (!tips) {
        console.warn('No tips found for:', { bodyType, goal });
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Render each tip category
    Object.entries(tips).forEach(([category, data], index) => {
        const card = document.createElement('div');
        card.className = `rec-card ${index === 0 ? 'accent' : ''}`;

        card.innerHTML = `
            <div class="icon"><i class="ph ${data.icon}"></i></div>
            <h3>${data.title}</h3>
            <ul>
                ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;

        container.appendChild(card);
    });

    // Update section subtitle with personalization
    const subtitle = document.querySelector('#recommendations .subtitle');
    if (subtitle) {
        subtitle.textContent = `Tailored advice for ${bodyType} ${goal}`;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', renderPersonalizedTips);

// Re-render when user data changes (export for use in user-form)
export { renderPersonalizedTips };
