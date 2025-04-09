class WorldMap{
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.floorImage = new Image();
        this.floorImage.src = config.floorSrc;

        this.isCutScenePlaying = false;

    }

    drawImage(ctx, cameraPerson){
        ctx.drawImage(
            this.floorImage, 
            utils.widthGrid(10.5) - cameraPerson.x, 
            utils.widthGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
        })

    }

    async startCutScene(events){
        this.isCutScenePlaying = true;

        //start a loop of async events
        for(let i=0; i<events.length; i++){
            const eventHandler = new OverWorldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }
        //await each one

        this.isCutScenePlaying = false;
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    } 
    removeWall(x,y){
        delete this.walls[`${x},${y}`];
    } 

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }


    checkForActionCutscene(){
        const hero = this.gameObjects["hero"];
      
        const goose = this.gameObjects["goose"];

        //laptop, move towards posters 

       if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(10,7)) && (`${goose.x},${goose.y}` === utils.asGridCoord(10,6)) && hero.dialogue.length) {
            if (!hero.dialogue[1].cutsceneTriggered) {
                this.startCutScene(hero.dialogue[1].events);
                hero.dialogue[1].cutsceneTriggered = true; // Mark the cutscene as triggered
            }
        }


        //posters, move towards easel
          if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(6,6)) && (`${goose.x},${goose.y}` === utils.asGridCoord(7,6)) && hero.dialogue.length) {
            if (!hero.dialogue[0].cutsceneTriggered) {
                this.startCutScene(hero.dialogue[0].events);
                hero.dialogue[0].cutsceneTriggered = true; // Mark the cutscene as triggered
            }
        }

        
        //easel, move towards guitar
        if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(2,9)) && (`${goose.x},${goose.y}` === utils.asGridCoord(3,9)) && hero.dialogue.length) {
            if (!hero.dialogue[2].cutsceneTriggered) {
                this.startCutScene(hero.dialogue[2].events);
                hero.dialogue[2].cutsceneTriggered = true; // Mark the cutscene as triggered
            }
        }

         //guitar, move towards plant

       if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(11,7)) && (`${goose.x},${goose.y}` === utils.asGridCoord(11,6)) && hero.dialogue.length) {
        if (!hero.dialogue[3].cutsceneTriggered) {
            this.startCutScene(hero.dialogue[3].events);
            hero.dialogue[3].cutsceneTriggered = true; // Mark the cutscene as triggered
        }
        }  

         //plant, move towards bed

       if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(10,9)) && (`${goose.x},${goose.y}` === utils.asGridCoord(9,9)) && hero.dialogue.length) {
        if (!hero.dialogue[4].cutsceneTriggered) {
            this.startCutScene(hero.dialogue[4].events);
            hero.dialogue[4].cutsceneTriggered = true; // Mark the cutscene as triggered
        }
    }

     //bed, move towards final scene
       if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(5,6)) && (`${goose.x},${goose.y}` === utils.asGridCoord(4,6)) && hero.dialogue.length) {
        if (!hero.dialogue[5].cutsceneTriggered) {
            this.startCutScene(hero.dialogue[5].events);
            hero.dialogue[5].cutsceneTriggered = true; // Mark the cutscene as triggered
        }
    }
      
     //bed, move towards final scene
     if (!this.isCutScenePlaying && (`${hero.x},${hero.y}` === utils.asGridCoord(7,7)) && (`${goose.x},${goose.y}` === utils.asGridCoord(8,7)) && hero.dialogue.length) {
        if (!hero.dialogue[6].cutsceneTriggered) {
            this.startCutScene(hero.dialogue[6].events);
            hero.dialogue[6].cutsceneTriggered = true; // Mark the cutscene as triggered
        }
    }
    
    } 
}

window.MyMap = {
    BedRoom:{
        floorSrc: "images/mapp.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.widthGrid(10),
                y: utils.widthGrid(9),
                dialogue: [

                
                 
                 {
                    //0
                    cutsceneTriggered: false, // Add this line

                    events: [
                        {who: "goose", type: "walk", direction: "down"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},

                        {who: "goose", type: "walk", direction: "down"},
                        {who: "goose", type: "walk", direction: "down"},

                        {who: "goose", type: "stand", direction: "left"},
                        {type: "textMessage", text: "The goose ran away again! By the way, these posters are quite dear to me. They're of Frida Kahlo and Janis Joplin, two women who really inspired me when I was younger. Anyway, I'll make another attempt to approach the goose."}
                    ]
                 },
               
                 {  

                    //1
                    cutsceneTriggered: false, // Add this line
                    events: [
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "stand", direction: "left"},

                        {type: "textMessage", text: `Huh, the goose saw me and darted off. Maybe it's trying to avoid confrontation. Also, it seems like I left my laptop open. You'll often spot me tinkering away on my laptop, dreaming up whimsical projects and scribbling nonsense on <a href="https://medium.com/@nafisashamim1999" target="_blank"> Medium </a>.`},
                        {type: "textMessage", text: `About this little project, it's only going to get sillier with time. If you want to remain updated, you can swing by my <a href="https://github.com/CreativeBinBag" target="_blank"> GitHub </a>. You can also take a peek at my <a href="https://drive.google.com/file/d/1sUT4VOZ9hAhGgv4Qklu244_A_tDFLxa_/view?usp=sharing" target="_blank"> Resume </a> if you're wondering whether I'd be a good fit for your team. Okay, let's try talking to the goose again.`}

                    ]
                 },

                 {  

                    //2
                    cutsceneTriggered: false, // Add this line
                    events: [
                        {who: "goose", type: "walk", direction: "up"},
                        {who: "goose", type: "walk", direction: "up"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "up"},

                        {who: "goose", type: "stand", direction: "down"},

                        {type: "textMessage", text: `I wonder why the goose is being so difficult; it's really frustrating me. But this is a good time to mention that even though life is chaotic in general, I find a lot of peace in art. I am obsessed with pencils and Stonehenge papers, thanks to Miles Johnston, one of my greatest inspirations. Please go see my <a href = "https://drive.google.com/file/d/1wGTgNmsQy8APeKNokvygBWKl8bGv54jw/view?usp=sharing" target="_blank"> art portfolio </a> to be sure that I am not bluffing.`},

                    ]
                 },

                 {  

                    //3
                    cutsceneTriggered: false, // Add this line
                    events: [
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "down"},
                        {who: "goose", type: "walk", direction: "down"},
                        {who: "goose", type: "walk", direction: "down"},
                     

                        {who: "goose", type: "stand", direction: "right"},

                        {type: "textMessage", text: `Goose skedaddled again! Perhaps I am wasting my time, and I should get back to practicing my guitar. I pretend that I know how to play the guitar like John Mayer. Sure, mastering his version of 'All Along The Watchtower' might take a lifetime, but a bit of delusion never hurt anyone. Anyway, you can go check out an equally pretentious playlist curated by me on <a href = "https://open.spotify.com/playlist/4OIwkcbr0aslQCWKP0ywzW?si=121f18f741844064" target="_blank"> Spotify </a>.`},


                    ]
                 },

                 {  

                    //4
                    cutsceneTriggered: false, // Add this line
                    events: [
                        {who: "goose", type: "walk", direction: "up"},
                        {who: "goose", type: "walk", direction: "up"},
                        {who: "goose", type: "walk", direction: "up"},

                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                        {who: "goose", type: "walk", direction: "left"},
                     

                        {who: "goose", type: "stand", direction: "right"},

                        {type: "textMessage", text: "I don't think I like goose anymore. Back in the day, I was so starved for company, I started chatting up plants. Turns out, they're pretty great pals even when I'm not desperate for human (or goose) interaction. Green, serene, and drama-free, unlike some other life forms I know."},


                    ]
                 },

                 {  

                    //5
                    cutsceneTriggered: false, // Add this line
                    events: [
                        {who: "goose", type: "walk", direction: "down"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
                        {who: "goose", type: "walk", direction: "right"},
             
                     

                        {who: "goose", type: "stand", direction: "left"},

                        {type: "textMessage", text: "The goose's behavior has been outrageous. I'm exhausted from all the chasing. It's better for me to rest on my bed, where I can ponder life's mysteries. Sometimes, I'm here with a good book, like lately with Camus' The Myth of Sisyphus. I feel a bit like Sisyphus myself these days. Nevertheless, I think I'll give it one last try."},


                    ]
                 },
                  
                 {  

                    //6
                    cutsceneTriggered: false, // Add this line
                    events: [
                  
                        {who: "goose", type: "stand", direction: "right"},

                        {type: "textMessage", text: "Goose, you silly goose, why are you avoiding me? I've been trying to talk to you about this mix-up. I think you accidentally took my wig, and I'd appreciate it if you returned it peacefully."},
                        {who: "goose", type: "stand", direction: "left"},


                        {type: "textMessage", text: "Goose: Quack, ridiculous! How could you think a wig so small could fit your enormous head? A few days ago, I asked for your help ordering this wig online, but you were too busy with your stupid little projects. I have no time for people who don't care about me. No quacks from me for days."},
                        {type: "textMessage", text: "Oh dear, I'm so sorry, Goose. I didn't realize the size difference. I've been chasing you, thinking you were being silly, but turns out I'm the silly one!"},
                        {type: "textMessage", text: "Goose: Damn right. Even though I'm wearing the clown wig, you're the real clown here. I hope the viewers see who the true silly goose is now!"},
                        {who: "goose", type: "stand", direction: "right"},

                    ]
                 },
             
                ]
            }),

            goose: new Person({
                x: utils.widthGrid(8),
                y: utils.widthGrid(8),
                src: "images/goose_spritesheet.png",
                
            }),

        },

        
        walls: {
            // "16,16": true
          [utils.asGridCoord(0,4)]: true,
          [utils.asGridCoord(1,4)]: true,
          [utils.asGridCoord(2,4)]: true,
          [utils.asGridCoord(3,4)]: true,
          [utils.asGridCoord(4,4)]: true,
          [utils.asGridCoord(5,4)]: true,
          [utils.asGridCoord(6,4)]: true,
          [utils.asGridCoord(7,4)]: true,
          [utils.asGridCoord(8,4)]: true,
          [utils.asGridCoord(9,4)]: true,
          [utils.asGridCoord(10,4)]: true,
          [utils.asGridCoord(11,4)]: true,
          //
          [utils.asGridCoord(12,4)]: true,
          [utils.asGridCoord(12,5)]: true,
          [utils.asGridCoord(12,6)]: true,
          [utils.asGridCoord(12,7)]: true,
          [utils.asGridCoord(12,8)]: true,
          [utils.asGridCoord(12,9)]: true,
          [utils.asGridCoord(12,10)]: true,
          [utils.asGridCoord(12,11)]: true,

          //
          [utils.asGridCoord(0,11)]: true,
          [utils.asGridCoord(1,11)]: true,
          [utils.asGridCoord(2,11)]: true,
          [utils.asGridCoord(3,11)]: true,
          [utils.asGridCoord(4,11)]: true,
          [utils.asGridCoord(5,11)]: true,
          [utils.asGridCoord(6,11)]: true,
          [utils.asGridCoord(7,11)]: true,
          [utils.asGridCoord(8,11)]: true,
          [utils.asGridCoord(9,11)]: true,
          [utils.asGridCoord(10,12)]: true,
          [utils.asGridCoord(11,12)]: true,

          //
          [utils.asGridCoord(0,5)]: true,
          [utils.asGridCoord(0,6)]: true,
          [utils.asGridCoord(0,7)]: true,
          [utils.asGridCoord(0,8)]: true,
          [utils.asGridCoord(0,9)]: true,
          [utils.asGridCoord(0,10)]: true,
          [utils.asGridCoord(0,11)]: true,

          //bed
          [utils.asGridCoord(4,5)]: true,
          [utils.asGridCoord(3,6)]: true,
          [utils.asGridCoord(2,6)]: true,
          [utils.asGridCoord(1,6)]: true,
          [utils.asGridCoord(0,6)]: true,

          //wardrobe
          [utils.asGridCoord(7,5)]: true,
          [utils.asGridCoord(8,5)]: true,
          [utils.asGridCoord(10,5)]: true,
          [utils.asGridCoord(11,5)]: true,

          //easel and plant
          [utils.asGridCoord(4,8)]: true,
          [utils.asGridCoord(5,8)]: true,

          [utils.asGridCoord(4,9)]: true,
          [utils.asGridCoord(5,9)]: true,

          [utils.asGridCoord(4,10)]: true,
          [utils.asGridCoord(5,10)]: true,
          [utils.asGridCoord(9,10)]: true,
          [utils.asGridCoord(10,10)]: true,
          [utils.asGridCoord(10,11)]: true,
          [utils.asGridCoord(6,10)]: true,



        
          

     }
    },
}
