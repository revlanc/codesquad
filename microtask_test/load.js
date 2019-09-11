fetch('../card_navigation/localData.json')
  .then(res => res.json())
  .then(data => {
    // for (let i = 0; i < 2000000000; i++) { }
    console.log('fetch finished', data)
  })

// for (let i = 0; i < 2000000000; i++) { }

console.log('load.js finished')