

class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }

    startGameLoop() {

        const step = () => {
           
           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

           //Establish the camera person
           const cameraPerson = this.map.gameObjects.hero;

           Object.values(this.map.gameObjects).forEach(object => {

            object.update({
              arrow: this.directionInput.direction,
              map: this.map,

             })
           })

           this.map.drawImage(this.ctx, cameraPerson);

           //Draw Game Objects
          Object.values(this.map.gameObjects).sort((a,b) => {
           return a.y - b.y;
          }).forEach(object => {
            object.sprite.draw(this.ctx, cameraPerson);
          })
      
           requestAnimationFrame (() => {
            step();
           })
         }
         step();
    } 

    bindActionInput(){

      new KeyPressListener("Enter", () =>{
        this.map.checkForActionCutscene()
      })

    }
   
    init() {

      const backgroundMusic = document.getElementById("background-music");

        const playMusic = () => {
            backgroundMusic.volume = 1.0; // Set the volume level (0.0 to 1.0)
            backgroundMusic.play().catch(error => {
                console.error("Error playing background music:", error);
            });
        };

        // Listen for user interaction to start music
        document.body.addEventListener("click", playMusic, { once: true });
        document.body.addEventListener("keydown", playMusic, { once: true });

        // Fallback to attempt play when audio is ready to avoid issues
        backgroundMusic.addEventListener('canplaythrough', () => {
            playMusic();
        });




      this.map = new WorldMap(window.MyMap.BedRoom);
      this.map.mountObjects();

     this.bindActionInput();

      this.directionInput = new DirectionInput;
      this.directionInput.init();
      
      this.startGameLoop();

      this.map.startCutScene([


        
        { who: "hero", type: "stand", direction: "down"},


        {type: "textMessage", text: "Hello, my name is Nafisa Shamim Rafa. Welcome to my little corner of the web. It might look confusing at first, but I couldn't think of a better way to present myself."},
        {type: "textMessage", text: "Also, there's a goose in my room! It took my wig. Can you help me get it back? Just use the arrow keys to lead me to the goose so that I can have a conversation with it."},
        {type: "textMessage", text: "Make sure I'm facing the goose when talking; otherwise, it won't respond. Yep, the goose can be picky that way. Once I'm facing it and ready to have a heated discussion, press Enter. Now, click 'Next' to proceed." },
        { who: "goose", type: "walk",  direction: "up" },
        { who: "goose", type: "walk",  direction: "up"},
        { who: "goose", type: "walk",  direction: "right"},
        { who: "goose", type: "walk",  direction: "right"},
        { who: "goose", type: "stand",  direction: "down"}, 

      

        
      
      ])
   
    }
   
   }