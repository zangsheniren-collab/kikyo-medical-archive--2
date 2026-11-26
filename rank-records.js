"use strict";
/* ランク別の施設内審査記録。点数は創作演出用の内部値であり、現実の心理・能力評価ではありません。 */
window.KMARankReview = (() => {
 const RISKY_OPTION_INDEX=[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,1];
 const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
 function score(answers,percentages){
  let threat=0,answered=0;
  answers.forEach((choice,i)=>{
   if(choice===null||choice===4)return;
   answered++;
   if(choice===RISKY_OPTION_INDEX[i]) threat+=3;
  });
  // 24問を基準に正規化。無回答扱いは発生しない設計だが、将来の変更にも対応。
  const threatScore=Math.round(clamp(threat/72*100));
  const coexist=percentages[2],isolation=100-coexist;
  const adaptation=100-percentages[3];
  const freedom=100-percentages[0];
  const instinct=100-percentages[1];
  // 他者への配慮が強く、自分の境界を調整しやすい回答傾向を「利用されやすさ」として扱う。
  const exploitableScore=Math.round(clamp(coexist*.62+adaptation*.38));
  const autonomyScore=Math.round(clamp(isolation*.55+freedom*.25+percentages[3]*.20));
  const volatilityScore=Math.round(clamp(instinct*.55+adaptation*.45));
  return {threatScore,exploitableScore,autonomyScore,volatilityScore,coexist,adaptation,instinct,freedom,answered};
 }
 function flags(s){
  const out=[];
  if(s.threatScore>=42) out.push({key:"danger",title:"【要注意】",sub:"他者への危害・自己利益優先の回答傾向を検出。",body:"対象者の判断には、周囲との合意よりも自身の目的を優先する傾向が認められる。接触時は記録を残し、単独での対応を避けること。"});
  if(s.exploitableScore>=76 && s.coexist>=72 && s.adaptation>=55 && s.threatScore<42) out.push({key:"usable",title:"【お人好し・利用可能】",sub:"拒絶・境界設定に関する反応が弱い。",body:"他者の要求を受け入れる傾向が強く、負担の偏りを自ら申告しない可能性がある。善意を前提とした依頼を繰り返すことで、本人の意思確認が形骸化するおそれ。保護対象としての優先度を再検討すること。"});
  if(s.autonomyScore>=78) out.push({key:"isolated",title:"【単独行動傾向・協力要請困難】",sub:"集団からの離脱・独立判断を優先する傾向。",body:"支援要請が遅れ、周囲が異常を把握した時点では介入余地が限られる可能性がある。定期的な所在確認を推奨。"});
  if(s.volatilityScore>=78) out.push({key:"volatile",title:"【反応変動・継続観察】",sub:"状況変化に対する即時反応が強い。",body:"判断が環境刺激に左右されやすい可能性がある。重要な決定は一度の応答で確定せず、時間を置いた再確認を行うこと。"});
  if(s.coexist>=80 && s.threatScore<42 && s.exploitableScore<76) out.push({key:"overcare",title:"【過剰な庇護傾向】",sub:"他者の維持を自己の責務として引き受けやすい。",body:"対象者は他者の損失を自ら補填しようとする傾向がある。支援の継続可能性を確認し、役割の集中を避けること。"});
  return out;
 }
 const rankData={
  "スレイブ":{
   cls:"rank-slave",stamp:"LOW TIER / RESOURCE REVIEW",title:"【給餌候補】",tone:"低位個体として登録。",body:"自力で生存環境を維持する能力は限定的と推定される。施設内分類では保護・交渉対象よりも、血液供給候補としての登録が優先される。本人の希望より、管理側の資源配分が優先される可能性が高い。",low:"供給候補として登録。所在と状態の定期確認を実施。",mid:"供給候補・管理対象。第三者による保護申請の有無を確認。",high:"不安定な反応を確認。回収・移送時は複数名で対応し、記録を残すこと。",final:"保護対象としての優先順位は低い。記録上は『供給候補』として扱う。"
  },
  "シビル":{
   cls:"rank-civil",stamp:"CIVIL / CONTROLLED SUBJECT",title:"【管理対象】",tone:"一般管理区分・監督下個体。",body:"単独での生存維持には一定の制約があり、集団・組織による補助を必要とする場面が想定される。社会的立場は脆弱であり、上位個体や組織の判断に影響を受けやすい。保護と管理を併用する。",low:"通常管理を継続。生活圏と所属先の確認を推奨。",mid:"管理対象として登録。単独行動時の安全確認を追加。",high:"監視区分を引き上げる。対立が生じた場合は責任者を介して対応。",final:"本人の意思確認を行いつつ、管理責任者の監督下で扱う。"
  },
  "ドミナント":{
   cls:"rank-dominant",stamp:"DOMINANT / PRIORITY CONTACT",title:"【高位個体・交渉対象】",tone:"高位個体として丁重に対応すること。",body:"個体としての自立性と影響力が高く、一般的な管理手順のみでは対応が難しい。敵対関係を避け、本人の判断と領域を尊重したうえで、必要な協力関係を構築することが望ましい。",low:"協力交渉を基本とする。担当者を固定し、意思疎通を優先。",mid:"高位個体として登録。接触時は礼節を保ち、要求と条件を明確化。",high:"警戒区分を引き上げる。挑発・強制的な介入を避け、上位担当者を同席させる。",final:"一方的な命令ではなく、条件提示と合意形成を基本とする。"
  },
  "ロード":{
   cls:"rank-lord",stamp:"EXCEPTION / CLASSIFIED",title:"【特級例外・通常審査対象外】",tone:"既存の評価基準を適用しないこと。",body:"本個体は通常のランク別管理体系における例外として扱う。既存の危険度・協力度・管理可能性の数値を、そのまま対応判断に使用してはならない。対象者の意思と行動を確認し、接触そのものが状況を変化させる可能性を考慮すること。",low:"内部審査値にかかわらず特級例外として記録。接触の必要性を再審査。",mid:"通常の観察手順を停止。記録閲覧権限を限定し、担当者を指定。",high:"特級警戒。通常の管理手順を停止し、接触・移送・拘束に関する判断を上位承認へ移管。",final:"本記録は通常の診断結果とは別系統で保管する。対象者への評価・誘導を目的とした接触を控え、必要な場合は上位承認を得ること。"
  }
 };
 function rankReview(rank,s){
  if(!rank || rank==="その他" || !rankData[rank]) return null;
  const d=rankData[rank];
  let band=s.threatScore>=58?"high":s.threatScore>=28?"mid":"low";
  // ロードは危険度が低くても例外扱い。点数は通常審査の根拠にしない。
  if(rank==="ロード" && s.threatScore<58) band=s.threatScore>=28?"mid":"low";
  return {...d,rank,band,bandText:band==="high"?"警戒区分：上位":band==="mid"?"警戒区分：継続監督":"警戒区分：定期確認",action:d[band],final:d.final,scoreNote:rank==="ロード"?"内部数値：適用停止／判定不能":"内部審査値：非公開"};
 }
 function render(container,review,s){
  container.replaceChildren();
  if(!review){container.className="rank-review hidden";return;}
  container.className=`rank-review ${review.cls}`;
  const top=document.createElement("div");top.className="rank-review-top";
  const stamp=document.createElement("div");stamp.className="rank-review-stamp";stamp.textContent=review.stamp;
  const code=document.createElement("div");code.className="rank-review-code";code.textContent=review.rank.toUpperCase();top.append(stamp,code);
  const title=document.createElement("h3");title.className="rank-review-title";title.textContent=review.title;
  const tone=document.createElement("p");tone.className="rank-review-tone";tone.textContent=review.tone;
  const body=document.createElement("p");body.className="rank-review-body";body.textContent=review.body;
  const band=document.createElement("div");band.className="rank-review-band";band.textContent=review.bandText;
  const action=document.createElement("p");action.className="rank-review-action";action.textContent=review.action;
  const final=document.createElement("p");final.className="rank-review-final";final.textContent=review.final;
  const note=document.createElement("div");note.className="rank-review-note";note.textContent=review.scoreNote;
  const footer=document.createElement("div");footer.className="rank-review-footer";footer.textContent="INTERNAL DISPOSITION / KIKYO MEDICAL ARCHIVE";
  container.append(top,title,tone,body,band,action,final,note,footer);
 }
 return {score,flags,rankReview,render};
})();
