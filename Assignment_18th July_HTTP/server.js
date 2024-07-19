const http = require('node:http')
const fs=require('node:fs')

const server = http.createServer((request, response) => {
    // response.end('<h1>Hello World! Lets study about Computer Science.</h1><p>These are the subtopics we will cover:</p> <ul><li>Algorithms</li><li>AI</li><li>Computer Architecture</li><li>Software Engineering</li><li>Operating Systems</li></ul>')

    if(request.url== '/Algorithms'){
        let htmlFile1 = fs.readFileSync('algorithms.html', 'utf-8')
        // response.setHeader('Content-Type','text/html')
        // response.writeHead(200)
        response.end(htmlFile1)
    }
    else if(request.url== '/AI'){
        let htmlFile2 = fs.readFileSync('ai.html', 'utf-8')
        // response.setHeader('Content-Type','text/html')
        // response.writeHead(200)
        response.end(htmlFile2)
        
    }

    else if(request.url== '/Computer Architecture'){
        let htmlFile3 = fs.readFileSync('computer_architecture.html', 'utf-8')
        // response.setHeader('Content-Type','text/html')
        // response.writeHead(200)
        response.end(htmlFile3)
    }

    else if(request.url== '/Software Engineering'){
        let htmlFile4 = fs.readFileSync('software_engineering.html', 'utf-8')
        // response.setHeader('Content-Type','text/html')
        // response.writeHead(200)
        response.end(htmlFile4)
    }

    else if(request.url== '/Operating Systems'){
        let htmlFile5 = fs.readFileSync('operating_systems.html', 'utf-8')
        // response.setHeader('Content-Type','text/html')
        // response.writeHead(200)
        response.end(htmlFile5)
    }
 


})
server.listen(3000, 'localhost', ()=>console.log('server started at port 3000'))