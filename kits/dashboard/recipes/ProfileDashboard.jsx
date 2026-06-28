import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardCard from '../DashboardCard.jsx';
import ProfileHeader from '../../../components/molecules/ProfileHeader.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import GoalCard from '../../../components/molecules/GoalCard.jsx';
import Timeline from '../../../components/molecules/Timeline.jsx';
import Button from '../../../components/atoms/Button.jsx';
import { STUDENT, STUDENT_STATS, STUDENT_GOALS, STUDENT_TIMELINE } from '../data.js';

/**
 * ProfileDashboard — ملف شخصي/نظرة عامة (مجال: تعليم — طالب · قابل لـHR/طبّي).
 * تخطيط متمركز بلا إطار محاط (تباين). يركّب ProfileHeader · StatTile · GoalCard · Timeline.
 */
export default function ProfileDashboard() {
  return (
    <div className="fx col gap24" style={css('max-width:960px;margin:0 auto')}>
      <DashboardCard>
        <ProfileHeader
          name={STUDENT.name}
          subtitle={STUDENT.subtitle}
          avatar={STUDENT.avatar}
          meta={STUDENT.meta}
          actions={<Button variant="secondary">تعديل الملف</Button>}
        />
      </DashboardCard>

      <div className="grid cols3">
        {STUDENT_STATS.map((s, i) => <StatTile key={i} icon={s.icon} value={s.value} label={s.label} delta={s.delta} trend={s.trend} color={s.color} />)}
      </div>

      <div className="grid cols2" style={css('align-items:start')}>
        <div className="fx col gap16">
          {STUDENT_GOALS.map((g, i) => <GoalCard key={i} label={g.label} value={g.value} target={g.target} unit={g.unit} icon={g.icon} color={g.color} />)}
        </div>
        <DashboardCard title="النشاط الأخير"><Timeline items={STUDENT_TIMELINE} /></DashboardCard>
      </div>
    </div>
  );
}
