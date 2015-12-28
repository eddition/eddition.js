(function(global, $){
    'use strict'
    console.log("eddition.js loaded");
    var Eddition = function(firstName, lastName, language) {
        return new Eddition.init(firstName, lastName, language);
    }
    
    var supportedLangs = ['en', 'es', 'kr'];
    
    var greetings = {
        en: "Hello",
        es: "Hola",
        kr: "안녕"
    };
    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        kr: '안녕하세요'
    };
    
    var logMessages = {
        en:"Logged in",
        es:"Inicio session",
        kr:"로그인"
    }
    
    Eddition.prototype = {
        //greeting functions
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        validateLang: function(){
            if (supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        },
        greeting: function(){
            return greetings[this.language] + " " + this.firstName + '!';
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language] + " " + this.fullName();
        },
        greet: function(formal){
            var msg;
            
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if (console){
                console.log('msg');
            }
            
            return this;
        },

        HTMLGreeting: function(selector, formal){
            if (!$){
                throw 'jQuery not loaded';
            }
            
            if (!selector){
                throw ' Missing Jquery selector';
            }
            
            var msg;
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            $(selector).html(msg);
            
            return this;
        },

        //base function
        log: function(){
            if (console){
                console.log(logMessages[this.language] + ':' + this.fullName());
            }
            
            return this;
        },
        setLang: function(newLang){
            this.language = newLang;
            this.validateLang();
            
            return this;
        },
        
        //Array functions

        each: function(arr, fn){
            if(Array.isArray(arr) && typeof fn === "function"){
                for(var i=0; i < arr.length; i++){
                    fn(arr[i]);
                }
            }else{
                throw 'First parameter is not an array and/or second parameter is not a function';
            }
            return arr;
        },

        map: function(arr, fn){
            var newArr = [];
            if(Array.isArray(arr) && typeof fn === "function"){
                for(var i=0; i < arr.length; i++){
                    newArr.push( fn(arr[i]) );
                }
            }else{
                throw 'First parameter is not an array and/or second parameter is not a function';
            }
            return newArr;
        },

        //merges contents of two arrays
        merge: function(arr1, arr2){
            if (Array.isArray(arr1) && Array.isArray(arr2)){
                return arr1.concat(arr2);
            } else {
                throw "Both parameters must be arrays"
            }
        },

        mergeUnique: function(arr1, arr2){

            if (Array.isArray(arr1) && Array.isArray(arr2)){
                var a = arr1.concat(arr2);
                
                var removeDup = function(a){
                   for (var i=0; i < a.length; i++){
                       for (var j = i+1; j < a.length; j++){
                           if(a[j] === a[i]){
                               a.splice(j--,1);
                           }
                       }
                   }
                   return a;
                }

                return removeDup(a);

            } else {
                throw "Both parameters must be arrays"
            }
        }

        
    };
    
    Eddition.init = function (firstParam, secondParam, thirdParam) {
        if(typeof firstParam === 'string' && typeof secondParam === 'string'){
            var self = this;
            self.firstName = firstParam || '';
            self.lastName = secondParam || '';
            self.language = thirdParam || 'en';
        
            self.validateLang();     
        }

    }
    
    Eddition.init.prototype = Eddition.prototype;
    
    global.Eddition = global.e$ = Eddition;
    
}(window, jQuery));




