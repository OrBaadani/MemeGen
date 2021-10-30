'use strict'
var gSorted = false;
var gKeywords = {};
var gImgs = [{
        id: 1,
        url: 'img/meme-imgs-sqr/1.jpg',
        keywords: ['funny', 'politics']
    },
    {
        id: 2,
        url: 'img/meme-imgs-sqr/2.jpg',
        keywords: ['animal', 'happy', 'cute']
    },
    {
        id: 3,
        url: 'img/meme-imgs-sqr/3.jpg',
        keywords: ['animal', 'happy', 'cute']
    },
    {
        id: 4,
        url: 'img/meme-imgs-sqr/4.jpg',
        keywords: ['animal']
    },
    {
        id: 5,
        url: 'img/meme-imgs-sqr/5.jpg',
        keywords: ['cute', 'baby', 'mad']
    },
    {
        id: 6,
        url: 'img/meme-imgs-sqr/6.jpg',
        keywords: ['alien', 'man']
    },
    {
        id: 7,
        url: 'img/meme-imgs-sqr/7.jpg',
        keywords: ['baby', 'cute']
    },
    {
        id: 8,
        url: 'img/meme-imgs-sqr/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/meme-imgs-sqr/9.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/meme-imgs-sqr/10.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/meme-imgs-sqr/11.jpg',
        keywords: ['happy']
    },
    {
        id: 12,
        url: 'img/meme-imgs-sqr/12.jpg',
        keywords: ['happy']
    },
    {
        id: 13,
        url: 'img/meme-imgs-sqr/13.jpg',
        keywords: ['happy']
    },
    {
        id: 14,
        url: 'img/meme-imgs-sqr/14.jpg',
        keywords: ['movie']
    },
    {
        id: 15,
        url: 'img/meme-imgs-sqr/15.jpg',
        keywords: ['happy']
    },
    {
        id: 16,
        url: 'img/meme-imgs-sqr/16.jpg',
        keywords: ['happy']
    },
    {
        id: 17,
        url: 'img/meme-imgs-sqr/17.jpg',
        keywords: ['happy']
    },
    {
        id: 18,
        url: 'img/meme-imgs-sqr/18.jpg',
        keywords: ['cartoon', 'movie']
    }

];



function createImgs(id, keywords) {
    [{
        id,
        url: `img/meme-imgs-sqr/${id}.jpg`,
        keywords: keywords
    }];
}

function searchImg(searchWord) {
    const images = gImgs.filter(img => {
        return img.keywords.some(keyword => {
            return (keyword.toUpperCase() === searchWord.toUpperCase());
        });
    });
    return images;
}

function getImgs() {
    return gImgs;
}

function getImgsById(imgID) {
    return gImgs.find(img => {
        return img.id === imgID;
    });
}


function filterWords() {
    const images = gImgs.forEach(img => {
        return img.keywords.forEach(keyword => {
            gKeywords[keyword] = gKeywords[keyword] ? gKeywords[keyword] + 1 : 1;
        });

    });
    return gKeywords;
}

function sortBy() {
    filterWords();
    if (gSorted) return gKeywords;

    var sortable = [];
    for (var keyword in gKeywords) {
        sortable.push({ keyword, count: gKeywords[keyword] });
    }
    sortable.sort(function(a, b) {
        return b.count - a.count;
    });
    gKeywords = sortable;
    gSorted = true;
    return gKeywords;


    // gKeywords = {}
    // sortable.forEach(function(item) {
    //     gKeywords[item.keyword] = item.count
    // })
    // return gKeywords;
}

function getKeywords() {
    return gKeywords;
}