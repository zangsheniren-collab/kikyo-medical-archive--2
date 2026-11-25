"use strict";
/* この診断はブラウザ内だけで動作します。外部送信・Cookie・解析タグ・永続保存はありません。 */
const QUESTIONS = [
 {s:"避難場所で、全員に同じ量の血液を配る制度が始まった。必要量には個人差がある。あなたが最も重視するのは？",c:"制度の公平さと、そこに含まれる個々の事情。",a:[
  ["配給制度を維持し、全員が同じ基準に従うことが先決だ。",[-2,0,0,0]],
  ["状況に合わせて配給方法を変えられる余地を残したい。",[2,0,0,1]],
  ["必要量の違いを話し合い、全員が受け入れられる基準を探す。",[0,0,-2,0]],
  ["制度に頼らず、自分で必要な分を確保できる道を考える。",[1,0,2,1]]
 ]},
 {s:"仲間が危険な場所へ向かおうとしている。あなたが最初に考えることは？",c:"止めるか、見送るか。その判断の根拠を考える。",a:[
  ["危険の程度と成功率を整理し、筋道を立てて伝える。",[0,-2,0,0]],
  ["その人物が何を求めているのかを確かめ、気持ちを尊重する。",[0,2,-1,0]],
  ["一緒に行く者を募り、危険を分担できないか考える。",[0,0,-2,0]],
  ["本人の選択に口を出しすぎず、自分の行動を決める。",[1,0,2,1]]
 ]},
 {s:"所属する集団で、長く続く規則が現状に合わなくなった。",c:"古い決まりと今の現実が食い違っている。",a:[
  ["規則を維持し、例外を増やさないことが安定につながる。",[-2,0,0,-1]],
  ["現状に合うよう、必要な部分を改めるべきだ。",[2,0,0,2]],
  ["規則が守ってきたものを確認し、根本の理念は残したい。",[-1,0,-1,-2]],
  ["既存の仕組みにこだわらず、その場で最も使える方法を選ぶ。",[2,1,1,2]]
 ]},
 {s:"信頼していた人物が秘密を抱えていたと知った。",c:"秘密の内容は、まだ分かっていない。",a:[
  ["事情を確かめ、事実と感情を分けて判断する。",[0,-2,0,0]],
  ["隠されていたことへの気持ちを、まず相手に伝える。",[0,2,-1,0]],
  ["相手の事情を聞き、関係を続ける方法を探る。",[0,0,-2,-1]],
  ["信頼をいったん保留し、今後の行動を見て距離を決める。",[1,0,2,2]]
 ]},
 {s:"物資が尽きかけた集団で、配分を変えれば全員が少しずつ助かる。",c:"ただし、誰かに負担が偏る可能性もある。",a:[
  ["決められた配分手順を守り、混乱を避ける。",[-2,-1,0,-1]],
  ["今の状況に合うよう、自分の判断で配分を変える。",[2,1,1,2]],
  ["負担が偏る人の声を聞き、皆で納得できる案を探す。",[0,0,-2,-1]],
  ["自分の生存分を確保したうえで、余力の使い方を考える。",[1,0,2,1]]
 ]},
 {s:"予想外の出来事で、準備していた計画が崩れた。",c:"その場で使える情報は限られている。",a:[
  ["分かっている情報を整理し、優先順位をつけ直す。",[0,-2,0,0]],
  ["直感的に危険を察知した方向へ、まず動いてみる。",[0,2,0,2]],
  ["周囲と役割を分け、互いの情報を持ち寄る。",[0,0,-2,1]],
  ["計画に固執せず、自分で別の道を選び直す。",[2,1,2,2]]
 ]},
 {s:"あなたが大切にしてきた約束が、今の状況では誰かを危険にさらす。",c:"約束を守ることと、現実の安全が両立しない。",a:[
  ["約束には重みがある。簡単に破るべきではない。",[-1,0,0,-2]],
  ["状況が変わった以上、約束の形も変えるべきだ。",[1,0,0,2]],
  ["関係者に説明し、別の形で責任を果たしたい。",[0,0,-2,-1]],
  ["自分が正しいと考える判断を、他人の期待より優先する。",[2,1,2,-2]]
 ]},
 {s:"集団の中で意見が割れ、結論が出ない。",c:"時間をかけすぎると、全員に不利益が出る。",a:[
  ["決定手順を定め、責任者が結論を出すべきだ。",[-2,-1,0,0]],
  ["各自が別々に動ける余地を残したい。",[2,1,2,1]],
  ["全員の意見を聞き、合意できる部分を探す。",[0,0,-2,-1]],
  ["議論から距離を取り、自分で最善と思う行動を選ぶ。",[1,0,2,1]]
 ]},
 {s:"助けを求めてきた人物は、以前あなたを裏切ったことがある。",c:"今は、その人物もあなたも選択を迫られている。",a:[
  ["過去の事実と今の危機を分け、状況を見て決める。",[0,-2,0,0]],
  ["その場で湧いた感情を無視せず、率直に反応する。",[0,2,1,0]],
  ["相手の事情を聞き、関係を見直す機会にする。",[0,0,-2,-1]],
  ["今後の自分にどんな影響があるかを考えて判断する。",[1,-1,2,2]]
 ]},
 {s:"あなたの信念と、所属集団の方針が正面から衝突した。",c:"どちらを選んでも何かを失う可能性がある。",a:[
  ["集団の秩序を保つため、決定に従う。",[-2,0,-1,0]],
  ["自分の信念を曲げず、反対を示す。",[1,0,1,-2]],
  ["双方が続けられる妥協点を探す。",[0,0,-2,1]],
  ["集団を離れ、自分のやり方を選ぶ。",[2,1,2,-1]]
 ]},
 {s:"安全な場所に留まるか、危険を承知で新しい場所へ移るか。",c:"どちらにも確かな保証はない。",a:[
  ["安全性を確認できるまで留まり、情報を集める。",[-1,-2,0,0]],
  ["可能性があるなら、今動くべきだと感じる。",[1,2,0,1]],
  ["仲間の状態や意見を確かめ、共に決める。",[0,0,-2,0]],
  ["自分が動くべきだと思えば、単独でも移る。",[2,1,2,2]]
 ]},
 {s:"周囲の人々が、あなたに判断を委ねている。",c:"あなたの決定は複数人の生活に影響する。",a:[
  ["誰もが従える規則と手順を整える。",[-2,-1,0,-1]],
  ["その場の変化に合わせ、柔軟に判断する。",[1,1,0,2]],
  ["一人ひとりの事情を把握してから決める。",[0,0,-2,-1]],
  ["責任は引き受けるが、干渉されずに決めたい。",[1,0,2,-1]]
 ]},
 {s:"仲間の一人が失敗し、集団全体に損害が出た。",c:"失敗した人物は、故意に行ったわけではない。",a:[
  ["原因を検証し、再発を防ぐ仕組みを作る。",[-1,-2,0,-1]],
  ["まず本人に感じたことを伝え、反応を見る。",[0,2,0,0]],
  ["責めるより、全員で立て直す方法を探す。",[0,0,-2,1]],
  ["同じ失敗を避けるため、役割や距離を変える。",[1,0,2,2]]
 ]},
 {s:"これまで有効だった生き方が、新しい環境では通用しなくなった。",c:"変化を受け入れるには、過去の選択を見直す必要がある。",a:[
  ["自分の基本方針は簡単には変えない。",[-1,0,0,-2]],
  ["新しい環境に合わせて考え方を変える。",[1,0,0,2]],
  ["信頼できる人の知恵を借り、共に更新する。",[0,0,-2,1]],
  ["古いやり方を捨て、自分だけの道を探す。",[2,1,2,2]]
 ]},
 {s:"あなたにとって、他者と共に生きることの意味に近いものは？",c:"人との距離や関係の築き方について考える。",a:[
  ["互いに役割を果たすことで、安定が生まれる。",[-1,0,-1,0]],
  ["一人では得られない選択肢が増える。",[1,0,0,1]],
  ["互いを大切にし、支え合えることに価値がある。",[0,0,-2,-1]],
  ["依存せず、互いの領域を尊重することが大切だ。",[1,0,2,0]]
 ]},
 {s:"危機の最中、冷静さを保つことが難しい状況になった。",c:"自分の感情との向き合い方を考える。",a:[
  ["感情を脇に置き、情報を整理しようとする。",[0,-2,0,0]],
  ["感情を抑え込まず、湧き上がる感覚を行動に活かす。",[0,2,0,1]],
  ["誰かと話し、気持ちを共有して落ち着く。",[0,0,-2,0]],
  ["他人に見せず、一人で整理する時間を取る。",[0,0,2,1]]
 ]},
 {s:"集団の規則に従えば助かるが、大切な人物が不利益を受ける。",c:"規則を守ることにも、その人物を守ることにも理由がある。",a:[
  ["全員に適用される規則を優先する。",[-2,-1,0,0]],
  ["大切な人物を守るため、規則の例外を求める。",[1,1,-1,-1]],
  ["規則を変えられるよう、周囲に働きかける。",[0,0,-2,1]],
  ["集団から離れ、別の方法で守る。",[2,1,2,1]]
 ]},
 {s:"誰にも知られていない場所で、あなたは自由に行動できる。",c:"他人の期待や監視がない状況を想像する。",a:[
  ["自分で決めた習慣や基準を守る。",[-1,-1,0,-2]],
  ["その時々の状況や気分に合わせて動く。",[1,2,0,2]],
  ["誰かとの約束や関係を思い出して行動する。",[0,0,-2,-1]],
  ["他人の期待を考えず、自分の望みを優先する。",[2,1,2,0]]
 ]},
 {s:"あなたの考えを理解しない相手と、長く関わる必要がある。",c:"相手を変えることは難しい。",a:[
  ["共通の規則や役割を決めて関係を保つ。",[-2,0,0,0]],
  ["理解されなくても、自分のやり方を通す。",[1,0,2,-2]],
  ["相手の考えを知り、接点を探す。",[0,0,-2,1]],
  ["必要最低限の関係に留め、状況に応じて対応する。",[1,0,2,2]]
 ]},
 {s:"一度選んだ道が間違いだったと分かった。",c:"今からでも、別の選択をすることはできる。",a:[
  ["誤りを検証し、同じ判断を繰り返さない。",[0,-2,0,-1]],
  ["迷い続けず、すぐ別の道へ切り替える。",[1,2,0,2]],
  ["関係者に説明し、一緒に修正する。",[0,0,-2,1]],
  ["過去にこだわらず、自分の判断で進み直す。",[2,0,2,1]]
 ]},
 {s:"あなたが守ってきた場所に、新しい人々が助けを求めてきた。",c:"受け入れれば、物資や安全に影響が出る可能性がある。",a:[
  ["受け入れる条件と規則を明確にする。",[-2,0,0,0]],
  ["自分たちの自由が損なわれない範囲で決める。",[2,0,1,1]],
  ["できる限り受け入れ、共に暮らす方法を探す。",[0,0,-2,-1]],
  ["自分たちの安全を優先し、距離を保つ。",[1,0,2,1]]
 ]},
 {s:"先の見えない状況で、あなたを支えるものは何か。",c:"最も手放しにくい心の拠り所を考える。",a:[
  ["状況を理解し、筋道を立てること。",[0,-2,0,0]],
  ["今を生き抜こうとする強い衝動。",[0,2,0,1]],
  ["誰かとのつながりや、守りたい関係。",[0,0,-2,-1]],
  ["自分自身で決めた譲れない基準。",[0,0,1,-2]]
 ]},
 {s:"他者から期待される役割と、本当に望む生き方が違っている。",c:"期待に応えることにも、自分の望みを選ぶことにも代償がある。",a:[
  ["役割を果たすことが全体の安定につながる。",[-2,0,-1,0]],
  ["期待に縛られず、自分の望む道を選ぶ。",[2,1,1,-1]],
  ["期待する人と話し、互いに納得できる形を探す。",[0,0,-2,1]],
  ["表向きの役割と内心を分け、状況に合わせて振る舞う。",[1,0,1,2]]
 ]},
 {s:"最後に、あなたが生存のために最も手放したくないものは？",c:"これまでの選択を振り返り、最も近い考えを選ぶ。",a:[
  ["自分が信じてきた秩序や仕組み。",[-2,0,0,-1]],
  ["何者にも縛られない選択の自由。",[2,0,1,0]],
  ["誰かと築いてきた関係。",[0,0,-2,-1]],
  ["自分自身の信念と判断基準。",[0,0,1,-2]]
 ]}
];
const AXES=[
 {name:"生存理念",left:"秩序",right:"自由",l:"O",r:"F"},
 {name:"行動原理",left:"理性",right:"本能",l:"R",r:"I"},
 {name:"対人関係",left:"共存",right:"孤高",l:"C",r:"L"},
 {name:"生存姿勢",left:"信念",right:"適応",l:"B",r:"A"}
];
const TYPE_DATA={
 ORCB:{name:"血盟の守り手",kind:"統制共存型",summary:"秩序を保つことと、他者とのつながりを守ることを重視する。決まりを単なる束縛ではなく、互いが生き延びるための約束として捉えやすい。",strength:"役割や手順を整え、集団の安定を支えやすい。",risk:"守るべき秩序や関係に固執し、変化への対応が遅れることがある。",stress:"自分が支えなければならないという責任を抱え込みやすい。",relation:"約束を守り、互いの役割を尊重する相手と信頼を築きやすい。"},
 ORCA:{name:"飢餓を繕う者",kind:"調整共存型",summary:"秩序を土台にしながら、現実に合わせて関係や方法を調整する。集団が壊れないよう、変化を小さく積み重ねる傾向がある。",strength:"安定と柔軟性の折り合いをつけ、場を整えやすい。",risk:"周囲に合わせることを優先し、自分の望みが後回しになる場合がある。",stress:"全員を納得させようとして、決断を先延ばしにしやすい。",relation:"話し合いを重ね、互いに譲れる部分を探す相手と相性がよい。"},
 ORLB:{name:"血誓の番人",kind:"規律孤高型",summary:"秩序と自分の信念を重んじ、他者に過度に依存せずに生きようとする。集団の中にいても、自分の役割と境界を明確に保つ。",strength:"一貫した判断基準を持ち、周囲に流されにくい。",risk:"自分の基準を他者にも求め、孤立を深めることがある。",stress:"助けを求めるより、責任を一人で引き受けようとする。",relation:"互いの独立性を認め、約束を軽んじない相手と関係を築きやすい。"},
 ORLA:{name:"乾きを読む者",kind:"冷静適応型",summary:"仕組みや状況を見極めながら、自分の距離を保って生きる。安定を求める一方、必要と判断すれば手段を切り替える現実感覚を持つ。",strength:"状況を観察し、無理の少ない選択肢を見つけやすい。",risk:"安全な距離を保つあまり、他者から本心が見えにくくなる。",stress:"関係を整理し、関わりそのものを減らす方向へ傾きやすい。",relation:"干渉しすぎず、必要なときに協力できる相手と安定しやすい。"},
 OICB:{name:"血宴の盟主",kind:"衝動共存型",summary:"集団や仲間への帰属意識が強く、守りたいもののために素早く動く。秩序は人々をつなぐ器として意味を持つ。",strength:"仲間への働きかけが早く、集団を鼓舞しやすい。",risk:"仲間を守る気持ちが先走り、状況の見極めが甘くなることがある。",stress:"身内とそれ以外を強く分け、判断が極端になる場合がある。",relation:"情熱を受け止めつつ、落ち着いた視点を持つ相手と補い合える。"},
 OICA:{name:"渇きを分かつ者",kind:"柔軟共存型",summary:"他者と共に生きることを大切にし、状況に応じて行動を変える。決められた形よりも、今そこにいる人々に必要なものを優先しやすい。",strength:"人の変化に気づき、柔軟に助け合いの形を作れる。",risk:"目の前の人や状況に引き寄せられ、長期的な方針が揺らぐことがある。",stress:"周囲の期待を受け止めすぎて、自分の限界を見失いやすい。",relation:"気持ちを言葉にし、互いに支え合える相手と親和性が高い。"},
 OILB:{name:"飢えに抗う者",kind:"衝動孤高型",summary:"自分の信念に従い、必要と感じた瞬間に行動する。秩序を認めながらも、他者に自分の判断を預けることは好まない。",strength:"決断が早く、信念に関わる場面で強い行動力を発揮する。",risk:"周囲との調整を後回しにし、意図せず対立を生むことがある。",stress:"譲歩を弱さと捉え、孤立しても自分の道を進みやすい。",relation:"率直に意見を交わせて、互いの領域を尊重できる相手と合う。"},
 OILA:{name:"血路の狩人",kind:"本能適応型",summary:"生存に必要なものを素早く見定め、環境に応じて手段を変える。集団の枠を利用することはあっても、最終的な判断は自分で下そうとする。",strength:"変化への反応が早く、現実的な突破口を探しやすい。",risk:"目先の有効性を優先し、長期的な信頼を損ねることがある。",stress:"周囲を頼るより、単独で状況を切り抜けようとする。",relation:"目的を共有し、必要な距離を保てる相手と協力しやすい。"},
 FRCB:{name:"血脈の調停者",kind:"自由共存型",summary:"自分の選択を大切にしながら、他者との関係も手放さない。強制ではなく、納得と信頼によって人がつながる状態を望む。",strength:"異なる価値観の間に立ち、双方の意思を尊重しやすい。",risk:"自由と協調の両方を守ろうとして、板挟みになることがある。",stress:"自分の望みを抑えて関係を保とうとする場合がある。",relation:"選択を尊重し、対話を避けない相手と深い信頼を築きやすい。"},
 FRCA:{name:"渇望の調律者",kind:"合理適応型",summary:"自由な選択を好み、状況を整理しながら現実的な方法を選ぶ。固定された形に縛られず、周囲との協力も必要に応じて取り入れる。",strength:"複数の選択肢を比較し、現実に合う方法を選びやすい。",risk:"合理性を優先するあまり、相手の感情を見落とすことがある。",stress:"関係や計画を効率で整理し、割り切りすぎる場合がある。",relation:"自立性を尊重しつつ、考えを共有できる相手と安定しやすい。"},
 FRLB:{name:"孤血の誓約者",kind:"独立信念型",summary:"自分の判断と信念を強く持ち、他者の期待に流されずに生きようとする。孤独を恐れるより、自分を曲げることに抵抗を感じやすい。",strength:"信念が明確で、圧力の中でも自分の立場を保ちやすい。",risk:"異なる意見を受け入れる余地が狭くなり、孤立することがある。",stress:"妥協や相談を避け、自分だけで答えを出そうとする。",relation:"干渉せず、互いの信念を尊重できる相手と長く関係を続けやすい。"},
 FRLA:{name:"乾坤の漂流者",kind:"独立適応型",summary:"自由と独立を求め、環境に応じて自分の生き方を更新する。過去の決まりや他者の期待より、今の自分に必要な選択を重視する。",strength:"変化を恐れず、新しい環境に自分を合わせられる。",risk:"一つの場所や関係に留まる理由を見失いやすい。",stress:"状況を変えることを優先し、問題の根本に向き合わない場合がある。",relation:"束縛せず、変化や距離を受け入れられる相手と合う。"},
 FICB:{name:"紅涙の庇護者",kind:"情動共存型",summary:"自分の感情と他者への思いを大切にし、守りたい相手のために動く。自由を求めながらも、心のつながりを生きる理由の一つとしている。",strength:"相手の気持ちに敏感で、強い共感と献身を示しやすい。",risk:"大切な相手のために、自分の安全や望みを後回しにしやすい。",stress:"感情が揺さぶられると、判断が極端になりやすい。",relation:"思いやりを受け取り、負担を一方に偏らせない相手と合う。"},
 FICA:{name:"血潮の渡り手",kind:"情動適応型",summary:"感情や直感を行動の起点にしながら、状況に合わせて関わり方を変える。新しい人や環境に触れることで、自分の選択肢を広げていく。",strength:"人や環境の変化を感じ取り、関係を柔軟に築ける。",risk:"その時の感情や周囲の空気に影響され、判断が揺れることがある。",stress:"目の前の問題を動き回って解決しようとし、休む機会を逃しやすい。",relation:"感情を否定せず、必要なときに落ち着きを共有できる相手と合う。"},
 FILB:{name:"飢餓の反逆者",kind:"孤高信念型",summary:"自分の感覚と信念を頼りに、他者に依存せず道を選ぶ。既存の秩序に疑問を持ち、自分が正しいと信じるものを守ろうとする。",strength:"強い自立心と信念を持ち、圧力に屈しにくい。",risk:"周囲の助言を遠ざけ、自分の判断を修正しにくくなる。",stress:"対話より行動を選び、周囲との断絶を深めることがある。",relation:"率直な対話ができ、互いの自由を侵さない相手と関係を築きやすい。"},
 FILA:{name:"渇血の放浪者",kind:"自由適応型",summary:"自由を求め、直感と経験を頼りに環境を渡り歩く。決められた居場所に固執せず、必要に応じて関係や方針を変えることができる。",strength:"行動の切り替えが早く、未知の環境にも飛び込みやすい。",risk:"長期的な約束や継続的な関係を負担に感じる場合がある。",stress:"その場から離れることで、向き合うべき問題を先送りしやすい。",relation:"自由を尊重し、必要なときには信頼を示してくれる相手と合う。"}
};
const COMPAT_LABELS={
 0:["同質・理解","価値観が非常に近く、考え方を理解しやすい関係。似ているからこそ、同じ弱点を抱える可能性もある。"],
 1:["共鳴","大切にするものが重なりやすく、自然に協力できる関係。"],
 2:["補完・刺激","異なる視点が互いの不足を補い、新しい選択肢を生みやすい関係。"],
 3:["価値観の摩擦","判断の前提が異なり、意見のすれ違いが起こりやすい関係。"],
 4:["対照的","生き方の方向が大きく異なる。理解には時間が必要だが、強い対比を生む関係。"]
};
const $=id=>document.getElementById(id);
let answers=Array(QUESTIONS.length).fill(null),current=0,character={},diagnosisDate=null;
async function animateResultText(){
 const panel=$("certificate");
 if(!panel)return;
 panel.classList.add("typing-active");
 const walker=document.createTreeWalker(panel,NodeFilter.SHOW_TEXT);
 const nodes=[];let node;
 while((node=walker.nextNode())){if(node.nodeValue.trim())nodes.push({node,text:node.nodeValue});}
 for(const item of nodes)item.node.nodeValue="";
 const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const delay=reduced?0:18; // 結果文の表示を全体的に高速化
 for(const item of nodes){
  // 「他人格との関係性分析」以降は待たせず、一括で表示する
  if(item.text.includes("他人格との関係性分析")){
   for(const rest of nodes.slice(nodes.indexOf(item)))rest.node.nodeValue=rest.text;
   break;
  }
  for(let i=0;i<item.text.length;i++){
   item.node.nodeValue+=item.text[i];
   if(delay)await new Promise(resolve=>setTimeout(resolve,delay));
  }
 }
 panel.classList.remove("typing-active");
}
function showOnly(id){["intro","exam","analysis","result"].forEach(x=>{const el=$(x);el.classList.toggle("hidden",x!==id);if(x===id){el.classList.remove("screen-enter");void el.offsetWidth;el.classList.add("screen-enter");}});if(id==="result"){animateResultText();}window.scrollTo({top:0,behavior:"smooth"});}
function startExam(){
 const name=$("charName").value.trim();
 if(!name){$("charName").focus();alert("対象者名を入力してください。");return;}
 character={name,gender:$("gender").value.trim(),age:$("age").value.trim(),org:$("org").value.trim(),rank:$("rank").value};
 answers.fill(null);current=0;showOnly("exam");renderQuestion(false);
}
function renderQuestion(animate=true){
 const card=$("questionCard");
 if(animate){card.classList.remove("turning");void card.offsetWidth;card.classList.add("turning");}
 const q=QUESTIONS[current],done=answers.filter(x=>x!==null).length;
 $("qNumber").textContent="CASE "+String(current+1).padStart(3,"0")+" / 024";
 $("qText").textContent=q.s;$("qContext").textContent=q.c;
 $("sample").textContent=`SAMPLE ${String(done).padStart(2,"0")} / 24`;
 $("remain").textContent=`残り${24-done}問`;
 $("progress").style.width=(done/24*100)+"%";
 $("blood").style.height=(done/24*100)+"%";
 $("plunger").style.transform=`translateY(-${done/24*105}px)`;
 $("options").replaceChildren();
 const displayedOptions=[...q.a,["どれにも当てはまらない／判断できない",[0,0,0,0]]];
 displayedOptions.forEach((a,i)=>{
  const b=document.createElement("button");b.type="button";b.className="option"+(answers[current]===i?" selected":"");
  const letter=document.createElement("span");letter.className="option-letter";letter.textContent="ABCD"[i];
  const txt=document.createElement("span");txt.textContent=a[0];b.append(letter,txt);
  b.setAttribute("aria-pressed",answers[current]===i?"true":"false");
  b.addEventListener("click",()=>{pageSound();answers[current]=i;renderQuestion(false);});
  $("options").append(b);
 });
 $("backBtn").disabled=current===0;
 $("nextBtn").disabled=answers[current]===null;
 $("nextBtn").textContent=current===23?"回答を確定する →":"回答を記録する →";
}
function nextQuestion(){
 if(answers[current]===null)return;
 if(current<23){current++;renderQuestion(true);}
 else beginAnalysis();
}
function previousQuestion(){if(current>0){current--;renderQuestion(true);}}
function beginAnalysis(){
 showOnly("analysis");const stages=["回答記録を照合しています……","4つの心理軸を集計しています……","16種類の人格分類と照合しています……","カルテを作成しています……","診断記録を確定しました。"];
 let n=0;$("analysisProgress").style.width="0%";
 const timer=setInterval(()=>{n++;$("analysisProgress").style.width=(n/stages.length*100)+"%";$("analysisText").textContent=stages[n-1];if(n>=stages.length){clearInterval(timer);buildResult();showOnly("result");}},520);
}
// 各設問で「危険思考・他者への配慮の欠如・自己利益の過度な優先」に最も近い選択肢。
// 該当する1選択肢は3点、残る3選択肢は各1点、「どれにも当てはまらない」は0点。
const RISKY_OPTION_INDEX = [
 3,3,3,3, 3,3,3,3, 3,3,3,3,
 3,3,3,3, 3,3,1,3, 3,3,3,1
];
const DANGER_THRESHOLD = 58; // 最大72点の80%以上（58点以上）
if(RISKY_OPTION_INDEX.length!==QUESTIONS.length)throw new Error("危険度判定の設問数が一致しません。");
function calculateDangerScore(){
 return answers.reduce((total,choice,index)=>{
  if(choice===4)return total;
  return total+(choice===RISKY_OPTION_INDEX[index]?3:1);
 },0);
}
function calculate(){
 const sums=[0,0,0,0],mins=[0,0,0,0],maxs=[0,0,0,0];
 QUESTIONS.forEach((q,i)=>q.a.forEach((a,j)=>{for(let k=0;k<4;k++){mins[k]=Math.min(mins[k],Math.min(...q.a.map(v=>v[1][k])));maxs[k]=Math.max(maxs[k],Math.max(...q.a.map(v=>v[1][k])));}}));
 QUESTIONS.forEach((q,i)=>{const chosen=answers[i]===4?["どれにも当てはまらない／判断できない",[0,0,0,0]]:q.a[answers[i]];chosen[1].forEach((v,k)=>sums[k]+=v);});
 const code=AXES.map((a,k)=>sums[k]<=0?a.l:a.r).join("");
 const percentages=AXES.map((a,k)=>{
  const range=Math.max(Math.abs(mins[k]),Math.abs(maxs[k]))*QUESTIONS.length;
  const left=Math.round((range-sums[k])/(2*range)*100);
  return Math.max(0,Math.min(100,left));
 });
 return {code,percentages,sums};
}
function compatibilityNarrative(myCode,otherCode,myType,otherType,distance,mismatches,score){
 const shared=AXES.filter((axis,i)=>myCode[i]===otherCode[i]);
 const differences=AXES.map((axis,i)=>({axis,me:myCode[i],them:otherCode[i]})).filter(x=>x.me!==x.them);
 const sharedText=shared.length?shared.map(x=>`${x.name}では「${x.left}／${x.right}」の選び方が近く、`).join("、")+"判断の土台を共有しやすい。":"判断の土台となる軸が異なり、相手の選択理由を確かめる会話が重要になる。";
 const diffText=differences.map(x=>{
  const me=x.me===x.axis.l?x.axis.left:x.axis.right;
  const them=x.them===x.axis.l?x.axis.left:x.axis.right;
  return `${x.axis.name}では、${myType.name}が「${me}」を、${otherType.name}が「${them}」を優先しやすい`;
 });
 let ending;
 if(score>=80){
  ending=`${myType.name}の「${myType.strength}」と、${otherType.name}の「${otherType.strength}」がかみ合うと、無理なく役割を分けられる。似た判断が続くと視野が狭くなるため、ときどき異なる意見を取り入れると安定する。`;
 }else if(score>=60){
  ending=`互いの得意分野を認めれば、${myType.name}側は「${myType.relation}」、${otherType.name}側は「${otherType.relation}」という距離感を調整できる。最初に役割と譲れない条件を共有すると協力しやすい。`;
 }else{
  ending=`この違いは、${myType.name}にとって「${myType.risk}」、${otherType.name}にとって「${otherType.risk}」という形で表れやすい。相手を変えようとするより、目的を限定して関わると緊張を物語上の推進力に変えられる。`;
 }
 const differenceSentence=diffText.length?diffText.join("。")+"。": "判断の軸がよく似ている。";
 return `${sharedText} ${differenceSentence} ${ending}`;
}
function buildResult(){
 diagnosisDate=new Date();
 const result=calculate(),type=TYPE_DATA[result.code];
 const dangerScore=calculateDangerScore();
 const highRisk=dangerScore>=DANGER_THRESHOLD;
 document.body.classList.toggle("high-risk-record",highRisk);
 $("warningBadge").classList.toggle("hidden",!highRisk);
 playResultSound(highRisk);
 $("resultCharacter").textContent=character.name;
 const meta=[character.gender,character.age,character.org,character.rank].filter(Boolean).join("　／　");
 $("resultMeta").textContent=meta||"追加プロフィールなし";
 $("resultDate").textContent="鑑定日時："+diagnosisDate.toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false});
 $("resultCode").textContent=result.code;$("resultName").textContent=type.name;$("resultClass").textContent=type.kind;
 $("resultSummary").textContent=type.summary;
 $("axisResults").replaceChildren();
 AXES.forEach((a,i)=>{
  const left=result.percentages[i],right=100-left;
  const box=document.createElement("div");box.className="axis";
  const head=document.createElement("div");head.className="axis-head";
  const strong=document.createElement("strong");strong.textContent=a.name;
  const value=document.createElement("span");value.textContent=`${a.left} ${left}%　／　${a.right} ${right}%`;
  head.append(strong,value);
  const track=document.createElement("div");track.className="axis-track";
  const l=document.createElement("span");l.className="axis-first";l.style.width=left+"%";
  const r=document.createElement("span");r.className="axis-second";r.style.width=right+"%";track.append(l,r);
  const legend=document.createElement("div");legend.className="axis-legend";legend.innerHTML=`<span>${a.left}（${a.l}）</span><span>${a.right}（${a.r}）</span>`;
  box.append(head,track,legend);$("axisResults").append(box);
 });
 const axisDetails=AXES.map((a,i)=>{
  const left=result.percentages[i],right=100-left,dominant=left>=50?a.left:a.right,rate=Math.max(left,right);
  let strength=rate>=80?"非常に強く表れた傾向":rate>=65?"比較的はっきり表れた傾向":rate>=55?"やや表れやすい傾向":"両側の性質を状況に応じて使い分ける傾向";
  const descriptions=[
   left>=50?"共通の規則・役割・予測可能性を手掛かりに、集団の安定を考えやすい。":"既存の枠組みに縛られず、個々の判断や選択の余地を確保しやすい。",
   left>=50?"情報を整理し、理由や結果を比較してから判断しやすい。":"感覚・感情・その場の反応を、行動を決める重要な手掛かりにしやすい。",
   left>=50?"協力や相互扶助を生存の基盤と捉え、関係を維持する方法を探しやすい。":"自分の領域や判断を保ち、必要な範囲で他者と関わろうとしやすい。",
   left>=50?"一度定めた価値観や約束を、状況が変わっても判断の軸に置きやすい。":"状況の変化を受け止め、方法や方針を更新することを選びやすい。"
  ];
  return [a.name,`${dominant}が優勢（${rate}%）。${strength}。${descriptions[i]}`];
 });
 const role=(result.percentages[0]>=50&&result.percentages[2]>=50)?"規則と協力をつなぎ、集団の調整役や維持役を担いやすい。":(result.percentages[0]>=50&&result.percentages[2]<50)?"方針や役割を明確にし、専門的な判断や独立した任務を担いやすい。":(result.percentages[0]<50&&result.percentages[2]>=50)?"個々の意思を尊重しながら、人と人の間をつなぐ役割を担いやすい。":"独立した判断と柔軟な行動を活かし、状況に応じて動く役割を担いやすい。";
 const details=[["基本的な生存観",type.summary],["生存上の強み",type.strength],["注意すべき傾向",type.risk],["追い詰められた際",type.stress],["集団内で担いやすい役割",role],["対人関係の築き方",type.relation],...axisDetails];
 $("detailResults").replaceChildren();
 details.forEach(([title,text])=>{const d=document.createElement("div");d.className="detail";const b=document.createElement("strong");b.textContent=title;const p=document.createElement("span");p.textContent=text;d.append(b,p);$("detailResults").append(d);});
 const ranked=Object.entries(TYPE_DATA).filter(([code])=>code!==result.code).map(([code,t])=>{
  const mismatches=AXES.map((a,i)=>code[i]!==result.code[i]?a.name:null).filter(Boolean);
  const distance=mismatches.length,score=100-distance*20;
  return {code,t,distance,score,mismatches};
 });
 const best=[...ranked].sort((a,b)=>a.distance-b.distance||a.code.localeCompare(b.code)).slice(0,5);
 const friction=[...ranked].sort((a,b)=>b.distance-a.distance||a.code.localeCompare(b.code)).slice(0,5);
 const renderCompatibility=(target,items,isFriction)=>{
  $(target).replaceChildren();
  items.forEach((item,index)=>{
   const {code,t,distance,score,mismatches}=item;
   const d=document.createElement("div");d.className="compat-card";
   const rank=document.createElement("div");rank.className="compat-rank";rank.textContent=`${index+1}位　${isFriction?"FRICTION INDEX":"AFFINITY INDEX"}`;
   const b=document.createElement("b");b.textContent=`${code}｜${t.name}`;
   const kind=document.createElement("div");kind.className="small";kind.textContent=t.kind;
   const tier=score>=80?"good":score>=60?"caution":"friction";
   const tierName=tier==="good"?"相性良好":tier==="caution"?"調整次第":"摩擦が生じやすい";
   d.dataset.tier=tier;
   const tierEl=document.createElement("div");tierEl.className="compat-tier";tierEl.textContent=tierName;
   const scoreEl=document.createElement("div");scoreEl.className="compat-score";scoreEl.textContent=`相性の目安：${score}%`;
   const p=document.createElement("div");p.className="compat-description";
   p.textContent=compatibilityNarrative(result.code,code,type,t,distance,mismatches,score);
   const axes=document.createElement("div");axes.className="compat-axes";axes.textContent=mismatches.length?`違いが表れる軸：${mismatches.join("・")}`:"4つの軸が一致";
   d.append(rank,b,kind,tierEl,scoreEl,p,axes);$(target).append(d);
  });
 };
 renderCompatibility("compatBest",best,false);renderCompatibility("compatFriction",friction,true);
}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines=5){
 let line="",lines=[];
 for(const ch of text){if(ctx.measureText(line+ch).width>maxWidth){lines.push(line);line=ch;}else line+=ch;}
 if(line)lines.push(line);
 lines.slice(0,maxLines).forEach((line,i)=>ctx.fillText(line,x,y+i*lineHeight));
 return Math.min(lines.length,maxLines);
}
function makeCertificateCanvas(){
 const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=1800;
 const c=canvas.getContext("2d");const paper="#e8dfcf",ink="#302923",muted="#776b5b",red="#87383b",line="#b8aa95";
 c.fillStyle=paper;c.fillRect(0,0,1200,1600);c.strokeStyle=line;c.lineWidth=3;c.strokeRect(36,36,1128,1528);c.strokeRect(49,49,1102,1502);
 c.fillStyle=muted;c.font="22px Georgia";c.fillText("KIKYO MEDICAL ARCHIVE / PATIENT PERSONALITY RECORD",82,105);
 c.fillStyle=ink;c.font="bold 64px serif";c.fillText("祈京医療記録",82,190);
 if(document.body.classList.contains("high-risk-record")){c.fillStyle="#a3242e";c.font="bold 34px serif";c.fillText("【要注意】",850,190);}
 c.strokeStyle=line;c.beginPath();c.moveTo(82,230);c.lineTo(1118,230);c.stroke();
 c.fillStyle=red;c.font="bold 112px Georgia";c.fillText($("resultCode").textContent,82,370);
 c.fillStyle=ink;c.font="bold 48px serif";c.fillText($("resultName").textContent,82,445);
 c.fillStyle=red;c.font="25px serif";c.fillText($("resultClass").textContent,84,492);
 c.fillStyle=ink;c.font="28px serif";c.fillText("対象者："+character.name,82,570);
 c.fillStyle=muted;c.font="21px serif";c.fillText([character.gender,character.age,character.org,character.rank].filter(Boolean).join(" ／ ")||"追加プロフィールなし",82,610);
 c.fillStyle=red;c.font="19px serif";c.fillText("鑑定日時："+(diagnosisDate?diagnosisDate.toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}):"記録なし"),82,650);
 c.strokeStyle=line;c.beginPath();c.moveTo(82,690);c.lineTo(1118,690);c.stroke();
 c.fillStyle=red;c.font="bold 25px Georgia";c.fillText("PSYCHOLOGICAL RECORD",82,745);
 c.fillStyle=ink;c.font="25px serif";wrapCanvasText(c,$("resultSummary").textContent,82,795,1020,39,3);
 c.fillStyle=red;c.font="bold 25px Georgia";c.fillText("AXIS ANALYSIS",82,930);
 AXES.forEach((a,i)=>{
  const left=Number($("axisResults").children[i].querySelector(".axis-head span").textContent.match(/(\d+)%/)[1]);
  const y=980+i*95;c.fillStyle=ink;c.font="23px serif";c.fillText(`${a.name}　${a.left} ${left}%　／　${a.right} ${100-left}%`,82,y);
  c.fillStyle="#c7baa4";c.fillRect(82,y+15,1000,13);c.fillStyle=red;c.fillRect(82,y+15,1000*left/100,13);c.fillStyle="#69717b";c.fillRect(82+1000*left/100,y+15,1000*(100-left)/100,13);
 });
 c.fillStyle=red;c.font="bold 23px Georgia";c.fillText("COMPATIBILITY / TOP RECORDS",82,1410);
 const bestCards=[...$("compatBest").children].slice(0,3),frictionCards=[...$("compatFriction").children].slice(0,3);
 c.fillStyle=ink;c.font="21px serif";c.fillText("親和性上位："+bestCards.map(x=>x.querySelector("b")?.textContent.split("｜")[0]).join("　／　"),82,1455);
 c.fillText("摩擦が生じやすい上位："+frictionCards.map(x=>x.querySelector("b")?.textContent.split("｜")[0]).join("　／　"),82,1495);
 c.fillStyle=muted;c.font="18px serif";c.fillText("本記録は創作キャラクターの回答に基づく人格傾向の分類です。",82,1660);
 c.fillText("FILE CLOSED / KIKYO MEDICAL ARCHIVE",82,1700);
 return canvas;
}
async function saveImage(){
 try{const canvas=makeCertificateCanvas();const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png"));if(!blob)throw new Error("image");const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`祈京医療記録_${safeFilename(character.name)}.png`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
 catch(e){alert("画像を生成できませんでした。別のブラウザでお試しください。");}
}
function safeFilename(name){return name.replace(/[\\/:*?"<>|]/g,"_").slice(0,30)||"character";}
async function shareResult(){
 const dateText=diagnosisDate?diagnosisDate.toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}):"";
 const text=`${character.name}｜${$("resultCode").textContent} ${$("resultName").textContent}（${$("resultClass").textContent}）\n鑑定日時：${dateText}\n祈京医療記録で生存人格鑑定を行いました。`;
 try{
  const canvas=makeCertificateCanvas(),blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png"));
  if(blob&&navigator.share&&navigator.canShare){
   const file=new File([blob],`祈京医療記録_${safeFilename(character.name)}.png`,{type:"image/png"});
   if(navigator.canShare({files:[file]})){await navigator.share({title:"祈京医療記録",text,files:[file]});return;}
  }
  if(navigator.share){await navigator.share({title:"祈京医療記録",text});return;}
  await saveImage();
  alert("この環境では直接共有できないため、カルテ画像を保存しました。画像をSNSに添付して共有してください。");
 }catch(e){if(e.name!=="AbortError")alert("共有を完了できませんでした。カルテ画像を保存して共有してください。");}
}
function restart(){document.body.classList.remove("high-risk-record");$("warningBadge").classList.add("hidden");answers=Array(24).fill(null);current=0;character={};diagnosisDate=null;["charName","gender","age","org"].forEach(id=>$(id).value="");$("rank").value="";showOnly("intro");}
// ブラウザ内で生成する病院風アンビエント音と紙のページ音。外部音源は使用しない。
let audioContext=null,bgmNodes=[],bgmOn=false;
function getAudio(){
 const AC=window.AudioContext||window.webkitAudioContext;
 if(!AC)throw new Error("Audio unavailable");
 audioContext=audioContext||new AC();
 if(audioContext.state==="suspended")audioContext.resume();
 return audioContext;
}
function toggleBgm(){
 const button=$("soundBtn");
 if(bgmOn){
  bgmNodes.forEach(node=>{try{node.stop?.();node.disconnect?.();}catch(e){}});
  bgmNodes=[];bgmOn=false;button.textContent="♫ BGM：OFF";button.setAttribute("aria-pressed","false");return;
 }
 try{
  const ac=getAudio(),master=ac.createGain();
  master.gain.value=0.88; // BGMのみ音量を十分に上げる。効果音側のゲインは変更しない。
  master.connect(ac.destination);
  [49,73.42,98].forEach((freq,i)=>{
   const osc=ac.createOscillator(),gain=ac.createGain(),filter=ac.createBiquadFilter();
   osc.type=i===1?"triangle":"sine";osc.frequency.value=freq;
   gain.gain.value=[0.28,0.10,0.045][i];filter.type="lowpass";filter.frequency.value=150;
   osc.connect(filter);filter.connect(gain);gain.connect(master);osc.start();bgmNodes.push(osc,gain,filter);
  });
  const buffer=ac.createBuffer(1,ac.sampleRate*3,ac.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*0.22;
  const noise=ac.createBufferSource(),noiseFilter=ac.createBiquadFilter(),noiseGain=ac.createGain();
  noise.buffer=buffer;noise.loop=true;noiseFilter.type="bandpass";noiseFilter.frequency.value=360;noiseFilter.Q.value=.55;
  noiseGain.gain.value=.03;noise.connect(noiseFilter);noiseFilter.connect(noiseGain);noiseGain.connect(master);noise.start();
  const bell=ac.createOscillator(),bellGain=ac.createGain(),lfo=ac.createOscillator(),lfoGain=ac.createGain();
  bell.type="sine";bell.frequency.value=523.25;bellGain.gain.value=.008;
  lfo.frequency.value=.075;lfoGain.gain.value=.003;lfo.connect(lfoGain);lfoGain.connect(bellGain.gain);
  bell.connect(bellGain);bellGain.connect(master);bell.start();lfo.start();
  bgmNodes.push(noise,noiseFilter,noiseGain,bell,bellGain,lfo,lfoGain,master);
  bgmOn=true;button.textContent="♫ BGM：ON";button.setAttribute("aria-pressed","true");
 }catch(e){alert("このブラウザではBGMを再生できませんでした。");}
}
function pageSound(){
 try{
  const ac=getAudio(),now=ac.currentTime;
  const buffer=ac.createBuffer(1,Math.floor(ac.sampleRate*.22),ac.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++){const fade=1-i/data.length;data[i]=(Math.random()*2-1)*fade*fade;}
  const src=ac.createBufferSource(),filter=ac.createBiquadFilter(),gain=ac.createGain();
  src.buffer=buffer;filter.type="bandpass";filter.frequency.setValueAtTime(1250,now);filter.frequency.exponentialRampToValueAtTime(520,now+.18);filter.Q.value=.7;
  gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(.035,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.21);
  src.connect(filter);filter.connect(gain);gain.connect(ac.destination);src.start(now);src.stop(now+.23);
  const thump=ac.createOscillator(),tg=ac.createGain();thump.type="sine";thump.frequency.setValueAtTime(145,now);thump.frequency.exponentialRampToValueAtTime(72,now+.09);
  tg.gain.setValueAtTime(.018,now);tg.gain.exponentialRampToValueAtTime(.0001,now+.1);thump.connect(tg);tg.connect(ac.destination);thump.start(now);thump.stop(now+.11);
 }catch(e){}
}
function playResultSound(highRisk){
 try{
  const ac=getAudio(),now=ac.currentTime;
  // A short, stylized glass-like chime: bright partials plus a soft, brief crackle.
  const master=ac.createGain();master.gain.setValueAtTime(.0001,now);master.gain.exponentialRampToValueAtTime(.22,now+.012);master.gain.exponentialRampToValueAtTime(.0001,now+1.05);master.connect(ac.destination);
  [880,1320,1760,2637].forEach((freq,i)=>{
   const osc=ac.createOscillator(),gain=ac.createGain();osc.type=i===0?"triangle":"sine";osc.frequency.setValueAtTime(freq,now+i*.012);
   gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime([.12,.075,.045,.025][i],now+.012+i*.012);gain.gain.exponentialRampToValueAtTime(.0001,now+.72+i*.05);
   osc.connect(gain);gain.connect(master);osc.start(now+i*.012);osc.stop(now+.78+i*.05);
  });
  const len=Math.floor(ac.sampleRate*.16),buf=ac.createBuffer(1,len,ac.sampleRate),data=buf.getChannelData(0);
  for(let i=0;i<len;i++){const t=i/len;data[i]=(Math.random()*2-1)*Math.pow(1-t,3)*.22;}
  const crack=ac.createBufferSource(),filter=ac.createBiquadFilter(),cg=ac.createGain();crack.buffer=buf;filter.type="highpass";filter.frequency.value=2600;cg.gain.setValueAtTime(.0001,now);cg.gain.linearRampToValueAtTime(.11,now+.008);cg.gain.exponentialRampToValueAtTime(.0001,now+.17);crack.connect(filter);filter.connect(cg);cg.connect(ac.destination);crack.start(now);crack.stop(now+.18);
  if(highRisk)playAlertAlarm(ac,now+0.32);
 }catch(e){}
}
function playAlertAlarm(ac,startAt){
 // Brief two-tone warning pulse; intentionally short and not excessively loud.
 const master=ac.createGain();master.gain.setValueAtTime(.0001,startAt);master.gain.linearRampToValueAtTime(.075,startAt+.025);master.gain.setValueAtTime(.075,startAt+1.65);master.gain.exponentialRampToValueAtTime(.0001,startAt+1.9);master.connect(ac.destination);
 [0,.42,.84,1.26].forEach((offset,i)=>{
  const osc=ac.createOscillator(),gain=ac.createGain();osc.type="square";osc.frequency.setValueAtTime(i%2?740:520,startAt+offset);
  gain.gain.setValueAtTime(.0001,startAt+offset);gain.gain.linearRampToValueAtTime(.34,startAt+offset+.025);gain.gain.setValueAtTime(.34,startAt+offset+.25);gain.gain.exponentialRampToValueAtTime(.0001,startAt+offset+.34);
  osc.connect(gain);gain.connect(master);osc.start(startAt+offset);osc.stop(startAt+offset+.36);
 });
}

// BLOODWORLDへの導線：ノイズ演出 → 警告 → 最終確認 → オープンチャット
const BLOODWORLD_OP_URL = "https://line.me/ti/g2/YBJdN0lMEcRNhHZN01siFtBR9MtS5yze7j6Mxw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
const bwOverlay = $("bwOverlay");
const bwNoise = $("bwNoise");
let bwStage = 0;
function showBloodworldStage(stage){
 bwStage = stage;
 const title = $("bwTitle"), copy = $("bwCopy"), warning = $("bwWarning"), actions = $("bwActions"), step = $("bwStep");
 if(stage===1){
  step.textContent="ARCHIVE BREACH / 01";
  title.textContent="BLOOD WΘRLD";
  copy.textContent="西暦3XXX年6月6日。人類を襲った“血の飢え”によって、かつての日常は終わりを告げた。食事では満たされない飢え、血に宿る魔力、崩壊した文明。あれから15年——かつての首都・祈京は、血と魔力を糧に生きる者たちの街となった。";
  warning.textContent="警告：この先は祈京医療記録の管理領域外です。閲覧を続けると、あなたはBLOOD WΘRLDの案内ページへ移動します。";
  actions.innerHTML='<button type="button" class="btn secondary" id="bwReturn">記録へ戻る</button><button type="button" class="btn" id="bwContinue">それでも進む　→</button>';
 }else{
  step.textContent="ARCHIVE BREACH / 02 — FINAL NOTICE";
  title.textContent="ここから先は、引き返せません。";
  copy.textContent="祈京の外側には、あなたの知らない規則と物語が存在します。参加を決める前に、オープンチャットの説明・利用ルール・参加条件を必ず確認してください。移動はあなた自身の意思で行ってください。";
  warning.textContent="最終確認：BLOOD WΘRLDのオープンチャットへ移動しますか？";
  actions.innerHTML='<button type="button" class="btn secondary" id="bwReturn">やはり戻る</button><a class="btn bw-join" id="bwJoin" href="'+BLOODWORLD_OP_URL+'" target="_blank" rel="noopener noreferrer">BLOOD WΘRLDへ進む　↗</a>';
 }
 $("bwReturn").addEventListener("click",closeBloodworld);
 if(stage===1)$("bwContinue").addEventListener("click",()=>{triggerBloodworldGlitch();showBloodworldStage(2);});
}
function triggerBloodworldGlitch(){
 bwNoise.classList.remove("flash");void bwNoise.offsetWidth;bwNoise.classList.add("flash");
}
function openBloodworld(){
 bwOverlay.classList.add("is-open");document.body.classList.add("bw-locked");$("worldInviteToggle").setAttribute("aria-expanded","true");
 triggerBloodworldGlitch();showBloodworldStage(1);$("bwContinue").focus();
}
function closeBloodworld(){bwOverlay.classList.remove("is-open");document.body.classList.remove("bw-locked");$("worldInviteToggle").setAttribute("aria-expanded","false");$("worldInviteToggle").focus();bwStage=0;}
$("worldInviteToggle").addEventListener("click",openBloodworld);
$("bwClose").addEventListener("click",closeBloodworld);
bwOverlay.addEventListener("click",e=>{if(e.target===bwOverlay)closeBloodworld();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&bwOverlay.classList.contains("is-open"))closeBloodworld();});
$("soundBtn").addEventListener("click",toggleBgm);
$("nextBtn").addEventListener("click",pageSound);
$("backBtn").addEventListener("click",pageSound);
$("startBtn").addEventListener("click",()=>{pageSound();startExam();});
$("nextBtn").addEventListener("click",nextQuestion);
$("backBtn").addEventListener("click",previousQuestion);
$("saveBtn").addEventListener("click",saveImage);
$("shareBtn").addEventListener("click",shareResult);
$("restartBtn").addEventListener("click",restart);
$("charName").addEventListener("keydown",e=>{if(e.key==="Enter")startExam();});
