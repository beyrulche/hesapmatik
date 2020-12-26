document.onkeydown = ({ key }) => {
    !isNaN(key) && (hesaplanan.innerHTML === '?' ?
        hesaplanan.innerHTML = key :
        hesaplanan.innerHTML += key);

    key === 'Enter' && kontrol(hesap1.innerHTML, hesap2.innerHTML, hesaplanan.innerHTML);
}

let sayilar = 9;
let islemTipi = ['+', '-', '*', '/'];

let l1 = localStorage.getItem("sayiList1");
let l2 = localStorage.getItem("sayiList2");

for (let x = 0; x <= sayilar; x++) {
    let check1 = `
    <div class="form-check form-check-inline">
        <input class="form-check-input sayiCheck1" type="checkbox" ${!l1 || l1.includes(x) ? 'checked' : ''} value="${x}">
        <label class="form-check-label">${x}</label>
    </div>`
    let check2 = `
    <div class="form-check form-check-inline">
        <input class="form-check-input sayiCheck2" type="checkbox"  ${!l2 || l2.includes(x) ? 'checked' : ''} value="${x}">
        <label class="form-check-label">${x}</label>
    </div>`

    document.getElementById('say1').innerHTML += check1;
    document.getElementById('say2').innerHTML += check2;
}

for (let x = 0; x < 4; x++) {
    let check1 = `
    <div class="form-check form-check-inline">
        <input class="form-check-input islemCheck" type="checkbox"  checked value="${islemTipi[x]}">
        <label class="form-check-label">${islemTipi[x]}</label>
    </div>`

    document.getElementById('islemTip').innerHTML += check1;

}

let sayiList1 = [];
let sayiList2 = [];
const listeGuncelle = () => {
    sayiList1 = [];
    sayiList2 = [];
    for (let s of document.getElementsByClassName('sayiCheck1')) {
        s.checked && sayiList1.push(parseInt(s.value));
    }
    for (let s of document.getElementsByClassName('sayiCheck2')) {
        s.checked && sayiList2.push(parseInt(s.value));
    }
    localStorage.setItem("sayiList1", sayiList1);
    localStorage.setItem("sayiList2", sayiList2);
};
let islemList = document.getElementsByClassName('islemCheck');
listeGuncelle();

let sonucD = document.getElementById('sonucD');
let sonucY = document.getElementById('sonucY');
let sonucP = document.getElementById('sonucP');

sonucD.innerHTML = '0';
sonucP.innerHTML = '0';
sonucY.innerHTML = '0';

let hesap1 = document.getElementById('hesap1');
let hesap2 = document.getElementById('hesap2');
let hesaplanan = document.getElementById('hesaplanan');

const temizle = () => hesaplanan.innerHTML = '?';
const rasgele = () => {
    let s1 = Math.floor(Math.random() * 100) % sayiList1.length;
    let s2 = Math.floor(Math.random() * 100) % sayiList2.length;
    let sayi1 = sayiList1[s1];
    let sayi2 = sayiList2[s2];
    hesap1.innerHTML = sayi1;
    hesap2.innerHTML = sayi2;
    temizle();
    document.getElementById('paspas').innerHTML =
        `<span class="badge bg-primary">${sayi1}</span>
        <span class="badge bg-warning text-dark">+</span>
        <span class="badge bg-primary">${sayi2}</span>
        <span class="badge bg-warning text-dark">=</span>
        <span class="badge bg-success">${sayi1 + sayi2}</span>`;
}
rasgele();

const pas = () => {
    sonucP.innerHTML++;
    let sayi1 = parseInt(hesap1.innerHTML);
    let sayi2 = parseInt(hesap2.innerHTML);

    islemler.innerHTML += `<span class="badge bg-warning" data-bs-toggle="modal" data-bs-target="#bilgi">${sayi1}+${sayi2}=${sayi1 + sayi2}</span>`;
    rasgele();
}
const anim = (id) => {

    let el = document.getElementById(id);
    el.animate([
        // keyframes
        { transform: 'translateY(0px), scale(0.7)', border: '0px solid yellow' },
        { transform: 'translateY(1px), scale(0.7)', border: '4px solid yellow' },
        { transform: 'translateY(0px), scale(0.7)', border: '0px solid yellow' }

    ], {
        // timing options
        duration: 1000,
        iterations: 2
    });
}

const kontrol = (a, b, c) => {
    let islemler = document.getElementById('islemler');
    let son = 'danger';
    if (c === '?') return false;
    if (parseInt(a) + parseInt(b) === parseInt(c)) {

        son = 'success';
        sonucD.innerHTML++;
        generateAnim(dParmak);
        generateAnim(dParmak);
        generateAnim(dParmak);

    }
    else {
        sonucY.innerHTML++;
        generateAnim(yParmak, 'red');
        generateAnim(yParmak, 'red');
        generateAnim(yParmak, 'red');


    }
    islemler.innerHTML += `<span class="badge bg-${son}" data-bs-toggle="modal"   data-bs-target="#bilgi">${a}+${b}=${c}</span>`;
    rasgele();
}
let buttons = document.querySelectorAll(".sayilar > button");
console.log(buttons);

buttons.forEach(x => {
    console.log(x);
    x.addEventListener('click', (a) => {
        console.log(a)
        hesaplanan.innerHTML === '?' ?
            hesaplanan.innerHTML = a.target.innerHTML :
            hesaplanan.innerHTML += a.target.innerHTML;
    });

})

var exampleModal = document.getElementById('bilgi')
exampleModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget
    const [s1, s2] = button.innerHTML.split('=')[0].split('+')
    document.getElementById('bilgim').innerHTML =
        `<span class="badge bg-primary">${s1}</span>
        <span class="badge bg-warning text-dark">+</span>
        <span class="badge bg-primary">${s2}</span>
        <span class="badge bg-warning text-dark">=</span>
        <span class="badge bg-success">${parseInt(s1) + parseInt(s2)}</span>`;
})


