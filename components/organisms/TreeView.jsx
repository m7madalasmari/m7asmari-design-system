import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * TreeView — شجرة متداخلة قابلة للطيّ (إزاحة RTL منطقية). توكنز فقط.
 * nodes: [{ id, label, icon?, children?: [...] }]
 * <TreeView nodes={[{id:'src',label:'src',icon:'folder',children:[…]}]} defaultExpanded={['src']} />
 */
export default function TreeView({ nodes = [], defaultExpanded = [], ariaLabel = 'شجرة', className = '' }) {
  const [open, setOpen] = React.useState(() => new Set(defaultExpanded));
  const toggle = (id) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const renderNodes = (list, depth) => list.map((node) => {
    const hasKids = node.children && node.children.length;
    const isOpen = open.has(node.id);
    const onActivate = () => { if (hasKids) toggle(node.id); };
    return (
      <li key={node.id} className="tree-li" role="treeitem" aria-expanded={hasKids ? isOpen : undefined}>
        <div
          className="tree-row"
          style={{ paddingInlineStart: (depth * 18 + 10) + 'px' }}
          tabIndex={0}
          onClick={onActivate}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); } }}
        >
          {hasKids
            ? <span className={'tree-caret' + (isOpen ? ' on' : '')}><Icon name="chevron-left" size={14} /></span>
            : <span className="tree-caret-sp" />}
          {node.icon != null ? <Icon name={node.icon} size={16} className="tree-ico" /> : null}
          <span className="tree-label">{node.label}</span>
        </div>
        {hasKids && isOpen ? <ul className="tree-ul" role="group">{renderNodes(node.children, depth + 1)}</ul> : null}
      </li>
    );
  });

  return <ul className={('tree ' + className).trim()} role="tree" aria-label={ariaLabel}>{renderNodes(nodes, 0)}</ul>;
}
