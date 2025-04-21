

function sayHello() {
    return new Promise((res, rej) => {
        setTimeout(() => {
           res('Hello, World!');
        }, 2000)
    })
}

async function testAsync()
{
    let response = await sayHello();
    console.log("sdfdsfdsf");
    console.log("56fg1h5g6f1h");
    return (response);
}

console.log(`Start`);
testAsync()
console.log(`End`);