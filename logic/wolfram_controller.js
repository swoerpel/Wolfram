class WolframController {
    constructor(params){
        this.params = params;
        this.param_machine = new ParameterGenerator()
    }

    Initialize(){
        this.wolfram_generator = new Wolfram();
        let seed_length = this.wolfram_generator.Initialize()
        let base_seed = this.generate_wolfram_base_seed(seed_length);
        this.wolfram_generator.SetSeed(base_seed)
    }

    getGenerator(){
        return this.wolfram_generator;
    }

    generate_wolfram_base_seed(seed_length){

        if(wolfram_params.load == '')
            return this.param_machine.rand_int(wolfram_params.base,seed_length)
        else{
            let seed = load_wolfram_saved_seed(wolfram_params.load).value
            return seed
        }
    }

    
}