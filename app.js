//Criando um filtro
Vue.filter('doneLabel', function(value){
    if(value == 0){
        return "Não Paga"
    }else{
        return "Paga"
    }
});

Vue.filter('statusGeneral', function (value) {
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if (!value){
        "Nenhuma conta a pagar";
    }else{
        return "Existem " + value + " contas a serem pagas"
    }
});


//Criando um objeto do vue
    var app = new Vue({

        el: "#app", //elemento que inicia tudo

        data: { //aonde definimos os dados da nossa app

            // test: '', two da binding

            title: "Contas a pagar",

            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ],

            activedView: 0,

            formType: 'insert',

            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },

            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Catão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],

            bills: [ //listagem de contas e mostrando uma coleção de dados - Array
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de Crédito ', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 2000.00, done: false},
            ]
        },

        computed: { //calculando propriedades | Propriedades Computadas

            status: function() {
                if(!this.bills.length){ // se for 0
                    return false;
                }

                var count = 0;

                //Retornando o indice de cada elemento do array
                for (var i in this.bills){
                    //
                    if (!this.bills[i].done) {
                        count++;
                    }
                }
                //Se não conseguiu contar, todas estão pagas, ou se for maior que 0, mostrar as que faltam a serem pagas
                return count;
            }
        },

        methods: { //criando metodos para a aplicação

            showView: function(id){ //Criando o metodo, para o evento click
                this.activedView = id;
                if(id == 1){
                    this.formType = 'insert';
                }
            },

            submit: function(){
                if(this.formType == 'insert'){
                    this.bills.push(this.bill);
                }

                //Cirando para Separar o bill da listagem do bill do formulário
                this.bill = {
                    date_due: '',
                    name: '',
                    value: 0,
                    done: 0
                }

                this.activedView = 0;
            },

            loadBill: function(bill){
                this.bill = bill;
                this.activedView = 1;
                this.formType = 'update';
            },

            deleteBill: function(bill){
                if(confirm('Deseja excluir esta conta?')){
                    this.bills.$remove(bill);
                }

            }

        }

    });




    //Evento watch, criado para teste durante o curso
    app.$watch('test', function(novoValor, velhoValor) {
        console.log("velhoValor: " + velhoValor + ", novoValor: " + novoValor);
    });