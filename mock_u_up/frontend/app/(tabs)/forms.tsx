import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { AppleInput } from '@/components/ui/AppleInput';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Ruler, Browsers, Lightning, Barbell } from 'phosphor-react-native';
import Animated, { FadeInDown, Layout, FadeIn } from 'react-native-reanimated';

const FORMS = [
    { id: 'profile', title: 'User Profile', icon: User, desc: 'Height, BodyType, Goal' },
    { id: 'body', title: 'Body Measurements', icon: Ruler, desc: 'Arms, Chest, Legs' },
    { id: 'skinfolds', title: 'Skinfolds', icon: Browsers, desc: 'Biceps, Abs, Iliac' },
    { id: 'calisthenics', title: 'Calisthenics', icon: Lightning, desc: 'Pushups, Pullups...' },
    { id: 'strength', title: 'Strength Training', icon: Barbell, desc: 'Bench, Squat, Deadlift' },
];

export default function FormsScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const renderFormContent = (id: string, isExpanded: boolean) => {
        if (!isExpanded) return null;

        let content = null;
        switch (id) {
            case 'profile':
                content = (
                    <View style={styles.formContainer}>
                        <AppleInput label="Date" placeholder="YYYY-MM-DD" />
                        <AppleInput label="Weight (kg)" placeholder="75.5" keyboardType="numeric" />
                        <AppleInput label="Height (cm)" placeholder="176" keyboardType="numeric" />
                        <AppleInput label="Body Type" placeholder="Ectomorph" />
                        <AppleInput label="Goal" placeholder="Hypertrophy" />
                    </View>
                ); break;
            case 'body':
                content = (
                    <View style={styles.formContainer}>
                        <AppleInput label="Date" placeholder="YYYY-MM-DD" />
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Arm" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Chest" keyboardType="numeric" /></View></View>
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Forearm" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Abs" keyboardType="numeric" /></View></View>
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Hips" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Leg" keyboardType="numeric" /></View></View>
                        <AppleInput label="Calf" keyboardType="numeric" />
                    </View>
                ); break;
            case 'skinfolds':
                content = (
                    <View style={styles.formContainer}>
                        <AppleInput label="Date" placeholder="YYYY-MM-DD" />
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Biceps" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Subscapular" keyboardType="numeric" /></View></View>
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Iliac Crest" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Abs" keyboardType="numeric" /></View></View>
                        <AppleInput label="Femoral" keyboardType="numeric" />
                    </View>
                ); break;
            case 'calisthenics':
                content = (
                    <View style={styles.formContainer}>
                        <AppleInput label="Date" placeholder="YYYY-MM-DD" />
                        <AppleInput label="Handstand (s)" keyboardType="numeric" />
                        <AppleInput label="Pull-ups (reps)" keyboardType="numeric" />
                        <AppleInput label="Push-ups (reps)" keyboardType="numeric" />
                        <AppleInput label="L-Sit (s)" keyboardType="numeric" />
                        <AppleInput label="V-Sit (s)" keyboardType="numeric" />
                    </View>
                ); break;
            case 'strength':
                content = (
                    <View style={styles.formContainer}>
                        <AppleInput label="Date" placeholder="YYYY-MM-DD" />
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Bench Press" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Military Press" keyboardType="numeric" /></View></View>
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Squat" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Deadlift" keyboardType="numeric" /></View></View>
                        <View style={styles.row}><View style={styles.flexHalf}><AppleInput label="Pull Ups" keyboardType="numeric" /></View><View style={styles.flexHalf}><AppleInput label="Curl" keyboardType="numeric" /></View></View>
                        <AppleInput label="Extension" keyboardType="numeric" />
                    </View>
                ); break;
        }

        return (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.expandedContent}>
                {content}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Save Entry</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
                <Text style={styles.title}>New Entry</Text>
                <Text style={styles.subtitle}>Select a category to log your data</Text>
            </Animated.View>

            <View style={styles.grid}>
                {FORMS.map((form, index) => {
                    const Icon = form.icon;
                    const isExpanded = expandedId === form.id;
                    return (
                        <Animated.View
                            key={form.id}
                            entering={FadeInDown.delay(index * 100).duration(500)}
                            layout={Layout.springify().damping(16).stiffness(140)}
                            style={[styles.card, isExpanded && styles.cardExpanded]}
                        >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => toggleExpand(form.id)}>
                                <LinearGradient
                                    colors={isExpanded ? ['rgba(94, 106, 210, 0.15)', 'rgba(0,0,0,0)'] : ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.01)']}
                                    style={styles.cardGradient}
                                >
                                    <View style={styles.cardHeader}>
                                        <View style={[styles.iconWrapper, isExpanded && styles.iconWrapperActive]}>
                                            <Icon size={24} color={isExpanded ? '#fff' : Colors.dark.primary} weight={isExpanded ? 'fill' : 'duotone'} />
                                        </View>
                                        <View style={styles.cardTitles}>
                                            <Text style={styles.cardTitle}>{form.title}</Text>
                                            <Text style={styles.cardDesc}>{form.desc}</Text>
                                        </View>
                                    </View>

                                    {renderFormContent(form.id, isExpanded)}
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background },
    content: { padding: 24, paddingTop: 80, paddingBottom: 160 },
    header: { marginBottom: 40 },
    title: { fontSize: 40, fontWeight: '800', color: '#fff', letterSpacing: -1, marginBottom: 8 },
    subtitle: { fontSize: 16, color: Colors.dark.textMuted },
    grid: { gap: 16 },
    card: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#161920' },
    cardExpanded: { borderColor: Colors.dark.primary },
    cardGradient: { padding: 24 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    iconWrapper: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(94, 106, 210, 0.1)', alignItems: 'center', justifyContent: 'center' },
    iconWrapperActive: { backgroundColor: Colors.dark.primary, shadowColor: Colors.dark.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 4 },
    cardTitles: { flex: 1 },
    cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
    cardDesc: { fontSize: 13, color: Colors.dark.textMuted },
    expandedContent: { marginTop: 24, paddingTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
    formContainer: { marginBottom: 24 },
    row: { flexDirection: 'row', gap: 16 },
    flexHalf: { flex: 1 },
    submitButton: { backgroundColor: Colors.dark.text, paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#fff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    submitText: { color: '#000', fontSize: 16, fontWeight: '700' }
});
