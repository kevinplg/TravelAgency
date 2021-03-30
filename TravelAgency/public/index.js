picNameAddress = ['IMG/sandbar.jpg','IMG/SunSeekers9.jpg', 'IMG/SunSeekers5.jpg', 'IMG/Sunsettree.jpg']
const photoContainer = document.querySelector('#photo-container')
for (let i = 0; i < 4; i++) {   
  //let img = new Image() //
  let img = document.createElement('img')
  // 72 is 67
  img.src = picNameAddress[i]
  img.classList.add('photo')  
  img.id = picNameAddress[i]
  photoContainer.append(img)
}

 picDesArr = ['FIJI', 'Hawaii', 'Tahiti', 'Mexico']
 for (let i = 0; i< 4; i++ ){
     let desc = document.createElement('span')
     desc.innerText = picDesArr[i]
     desc.id = 'desc_pic' + (i+1)
     console.log(desc)
     photoContainer.append(desc)
 }


for (let i = 0; i < picNameAddress.length; i++) {
    const desc = document.querySelector('#desc_pic' + (i+1))
    // const desc_pic =document.getElementById(picNameAddress + (i++))
    const picture =document.getElementById(picNameAddress[i])
    picture.addEventListener('mouseover',()=>{
        desc.style.opacity='1'
    })
    picture.addEventListener('mouseout', ()=>{
        desc.style.opacity='0'
 })   
}
// Below code replaced by array above for picture description.//

//  const desc_pic1 = document.querySelector('#desc_pic1')
//  const sandbar = document.getElementById('sandbar.jpg')
//  sandbar.addEventListener('mouseover',()=>{
//      console.log('in')
//      desc_pic1.style.opacity = '1'
//  })
//  sandbar.addEventListener('mouseout',()=>{
//      console.log('out')
//      desc_pic1.style.opacity = '0'

//  })


//  const desc_pic2 = document.querySelector('#desc_pic2')
//  const SunSeekers9 = document.getElementById('SunSeekers9.jpg')
//  SunSeekers9.addEventListener('mouseover',()=>{
//      console.log('in')
//      desc_pic2.style.opacity = '1'
//  })
//  SunSeekers9.addEventListener('mouseout',()=>{
//      console.log('out')
//      desc_pic2.style.opacity = '0'

//  })

//  const desc_pic3 = document.querySelector('#desc_pic3')
//  const SunSeekers5 = document.getElementById('SunSeekers5.jpg')
//  SunSeekers5.addEventListener('mouseover',()=>{
//      console.log('in')
//      desc_pic3.style.opacity = '1'
//  })
//  SunSeekers5.addEventListener('mouseout',()=>{
//      console.log('out')
//      desc_pic3.style.opacity = '0'

//  })

//  const desc_pic4 = document.querySelector('#desc_pic4')
//  const Sunsettree = document.getElementById('Sunsettree.jpg')
//  Sunsettree.addEventListener('mouseover',()=>{
//      console.log('in')
//      desc_pic4.style.opacity = '1'
//  })
//  Sunsettree.addEventListener('mouseout',()=>{
//      console.log('out')
//      desc_pic4.style.opacity = '0'

//  })
