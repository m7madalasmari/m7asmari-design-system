import React from 'react';

/**
 * Toolbar — شريط أدوات أفقي موحّد المسافات (يحتضن أي عناصر تحكّم). محايد للمجال.
 * استخدم <div className="f1" /> فاصلًا لدفع المجموعة الثانية للطرف.
 * <Toolbar><SearchField/><div className="f1"/><Button/></Toolbar>
 */
export default function Toolbar({ children, className = '' }) {
  return <div className={('toolbar ' + className).trim()}>{children}</div>;
}
