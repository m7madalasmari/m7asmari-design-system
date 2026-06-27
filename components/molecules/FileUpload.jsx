import React from 'react';

/**
 * FileUpload — منطقة رفع ملفات على أصناف M7 (.dropzone/.fileitem). تفتح مربّع الاختيار
 * بالنقر/Enter وتدعم السحب والإفلات، وتعرض الملفات المختارة (ديمو — بلا رفع فعلي).
 * <FileUpload multiple onChange={(files)=>…} accept="image/*" />
 */
const EXT_CLS = { zip: 'fico-zip', rar: 'fico-zip', mov: 'fico-mov', mp4: 'fico-mov' };
const fmtSize = (b) => {
  if (b < 1024) return b + ' بايت';
  if (b < 1024 * 1024) return Math.round(b / 1024) + ' ك.ب';
  return (b / (1024 * 1024)).toFixed(1) + ' م.ب';
};

export default function FileUpload({
  onChange,
  accept,
  multiple = false,
  label = 'اسحب الملفات هنا أو اضغط للاختيار',
  hint = 'بحدّ أقصى 10 ميجابايت للملف',
  status, // يُبتلع (يأتي من Field)
  id,
  ...rest
}) {
  void status;
  const inputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]);
  const pick = () => inputRef.current && inputRef.current.click();
  const onFiles = (list) => {
    const arr = Array.from(list || []);
    setFiles(arr);
    if (onChange) onChange(multiple ? arr : (arr[0] || null));
  };
  return (
    <div>
      <div
        className="dropzone"
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={pick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
      >
        <span className="dz-ico" aria-hidden="true">⤓</span>
        <div className="dz-title">{label}</div>
        <div className="dz-sub">{hint}</div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={(e) => onFiles(e.target.files)}
          {...rest}
        />
      </div>
      {files.length ? (
        <div role="list" aria-label="الملفات المختارة">
          {files.map((f, i) => {
            const ext = (f.name.split('.').pop() || '').toLowerCase();
            return (
              <div className="fileitem" role="listitem" key={i}>
                <span className={'fileico ' + (EXT_CLS[ext] || 'fico-pdf')} aria-hidden="true">
                  {ext.slice(0, 3).toUpperCase()}
                </span>
                <div className="filemain">
                  <div className="filename">{f.name}</div>
                  <div className="filemeta">{fmtSize(f.size)}</div>
                </div>
                <span className="filestat ok" aria-hidden="true">✓</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
