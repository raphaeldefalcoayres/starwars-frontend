import React from 'react';

// import { Container } from './styles';

export default function RowDesktop({
  type,
  character,
  index,
  page,
  flexListCols,
}) {
  if (type === 'desktop') {
    return (
      <div className="list-row" key={index}>
        {flexListCols.map(item => (
          <div className={`${item.class} list-col`}>{character[item.name]}</div>
        ))}
      </div>
    );
  }

  // return (
  //   <div className="list-row" key={index}>
  //     {flexListCols.map(item => (
  //       <div className={`${item.class} list-col px-2`}>
  //         {item.label ? <b>{item.label}: </b> : ''}
  //         {character[item.name]}
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="list-row" key={index}>
      {flexListCols.map(item => (
        <div className={`${item.class} list-col px-2`}>
          {item.label ? <b>{item.label}: </b> : ''}
          {character[item.name]}
        </div>
      ))}
    </div>
  );
}
