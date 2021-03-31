let rules=[];
 rules[0] = ({
  start: "( $today = (sunny | rainy | rainy and boisterous | rainy morning | showery | cloudy | heavy flooding | hot in the sun )). " ,

  weather:"sunny | rainy | rainy and boisterous | rainy morning | showery | cloudy | heavy flooding | hot in the sun",
  s1: "It was $weather in the morning, but turned $today in the afternoon."
})

rules[1]=({
  start:" $s2 | $s3 | $s4 | $s5 | $s6 | $s7  | $s8  | $s9[3] | $s10[2] ",
  s2: "It's the (plastic waste | face mask | plastic packaging ) generation. ( $s2_1 | )",
  s3: "The ( COVID-19 outbreak | coronavirus pandemic | outbreak pandemic | COVID-19 pandemic ) has ruined everything. Everything. ($s3_1 | )",
  s4: "The mask blocked the fresh and wet smell of the pine trees on the streets.",
  s5:"We cannot deny that ( the need for | the demand for) (love[3] | help | care | mask | medicine | company | vaccine | plastic).s() is growing insanely. Yes. We cannot deny. ($s5_1 | )",
  s6:"The comfirmed cases number is terribly high. I'm so scared. Everybody does.",
  s7:"We ordered takeout for dinner. Online delivery is just so convenient. Picture this: millions of people are ordering takeouts RIGHT NOW.",
  s8:"Before getting out, always double-check if you have your personal protective equipment with you.",
  s9:"The whole city is enveloped by sadness. ($s9_1 | )",
  s10:"I dived down into the depths. $s10_1",
  
  s9_1:"The number of confirmed cases in Beijing, People’s Republic of China. | The effect of a confirmed case. | The public paranoia about hygiene for fresh produce. | The rollback of such wastes.",
  s2_1:"It's the plastic value chain. | It's the plastic waste; let alone, with increased waste generation. | It's the plastic value chain.",
  s3_1:"The outbreak pandemic has however, enhanced the complexities of plastic waste. | The outbreak pandemic has however, enhanced the complexities of plastic as hygienic. | The outbreak pandemic has however, enhanced the complexities of plastic waste generation.",
  s5_1:"We cannot deny that the quality of the virus. | We cannot deny that the demand for petroleum collapsed | We cannot deny that the quality of the virus.",
  s10_1:"I dived down into the environment of pandemic. | I dived down into the development of new sustainable technologies. | I dived down into the current crisis of COVID-19 spikes.| I dived down into the current waste management."
})

