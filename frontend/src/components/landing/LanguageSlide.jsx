import classes from './LanguageSlide.module.css'

export default function LanguageSlide() {
  const greetings = [
    '안녕하세요',
    'Hello',
    'こんにちは',
    '你好',
    'Hola',
    'olá',
    'Χαίρετε',
    'Hallo',
    'नमस्कार',
    'Hej',
    'привет',
    'Сайн уу',
    'ဟယ်လို',
    'xin chào',
    'नमस्ते',
    'Hallå',
    'أهلا',
    'Halló',
    'Dia dhuit',
    'saluton',
    'Salom',
    'привіт',
    'ياخشىمۇسىز',
    'ciao',
    'halo',
    'Ahoj',
    'Сәлеметсіз бе',
    'வணக்கம்',
    'สวัสดี',
    'merhaba',
    'سلام',
    'Witam',
    'bonjour',
    'Hei',
    'Kamusta',
    'שלום',
    'नमस्ते',
  ]
  const weights = [3, 4, 5, 6, 7]

  const getRandomGreetings = n => {
    const result = []
    for (let i = 0; i < n; i++) {
      const languageIdx = Math.floor(Math.random() * greetings.length)
      const weightIdx = Math.floor(Math.random() * weights.length)
      result.push({
        id: i,
        text: greetings[languageIdx],
        weight: 'weight' + weights[weightIdx],
      })
    }
    return result
  }

  return (
    <div className={classes.languageSlide}>
      {getRandomGreetings(120).map(greeting => (
        <div
          key={greeting.id}
          className={`${classes.greeting} ${classes[greeting.weight]}`}
        >
          {greeting.text}
        </div>
      ))}
    </div>
  )
}
