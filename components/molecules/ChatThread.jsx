import React from 'react';
import Avatar from '../atoms/Avatar.jsx';

/**
 * ChatThread — محادثة RTL بفقاعات (مرسِل/مستقبِل). توكنز فقط.
 * messages: [{ from:'me'|'them', text, time?, name?, avatar? }]
 * <ChatThread messages={[{from:'them',text:'مرحبًا',name:'محمد',avatar:'…'},{from:'me',text:'أهلًا'}]} />
 */
export default function ChatThread({ messages = [], className = '' }) {
  return (
    <div className={('chat ' + className).trim()}>
      {messages.map((m, i) => {
        const me = m.from === 'me';
        return (
          <div className={'chat-msg ' + (me ? 'me' : 'them')} key={i}>
            {!me && m.avatar != null ? <Avatar variant="sm"><img src={m.avatar} alt="" /></Avatar> : null}
            <div className="chat-bubble">
              {!me && m.name != null ? <div className="chat-name">{m.name}</div> : null}
              <div className="chat-text">{m.text}</div>
              {m.time != null ? <div className="chat-time numjoin">{m.time}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
