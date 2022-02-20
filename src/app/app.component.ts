import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Produto } from './produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    readonly apiUrl : string;

    //O Angular será capaz de injetar uma instância da classe HttpClient dinamicamente
    constructor(private http: HttpClient) {
    	this.apiUrl = 'http://localhost:3000';
     }
  
    //Especificamos que o tipo de retorno é um array de produtos
	listarTodosProdutos() {
    	this.http.get<Produto[]>(`${this.apiUrl}/produtos`)
        	.subscribe({
				next: (v) => console.log(v),
				error: () => console.error(`Página não encontrada - ${HttpStatusCode.NotFound}`),
				complete: () => console.info("Operação completa")
			});
     }
   
     //O tipo de retorno é apenas <Produto[]>, posto que apenas um item é retornado
    listarProdutoPorId() {
    	this.http.get(`${this.apiUrl}/produtos/3`)
        	.subscribe({
        		next: (v) => console.log(`Produto: ${JSON.stringify(v)} - ${HttpStatusCode.Ok}`),
            	error: () => console.error(`Produto não localizado - ${HttpStatusCode.NotFound}`),
            	complete: () => console.info('Operação completa')
          });
    }

    adicionarProduto() {
    	var produto = { id: 4, nome: "produto c" };

    	this.http.post<Produto>(`${this.apiUrl}/produtos`, produto)
            .subscribe({
            	next: () => console.log(`Produto ${produto.id} adicionado com sucesso - ${HttpStatusCode.Created}`),
            	error: () => console.error(`
                    ${produto.id == produto.id}` ? "Produto com id já existe" 
                    : `Erro ${HttpStatusCode.BadRequest} Bad request`
                ),
            	complete: () => console.info('Operação completa')
            });
    }

    //Não deve ser tipada como <Produto> pois o corpo da resposta virá vazio
    alterarProduto() {
        var produto = { id: 5, nome: "teste teste 6" };

        this.http.put(`${this.apiUrl}/produtos/5`, produto)
        	.subscribe({
            	next: () => console.log("Produto alterado com sucesso."),
                error: () => console.error(`
                    ${produto.id == produto.id}` ? "Produto não localizado" 
                    : `Erro ${HttpStatusCode.BadRequest} Bad request`
                ),
                complete: () => console.info('Operação completa')
            });
    }

    excluirProduto() {
        this.http.delete(`${this.apiUrl}/produtos/1`)
        	.subscribe({
            	next: () => console.log('Produto excluído com sucesso.', ),
            	error: () => console.log(`Produto não localizado - ${HttpStatusCode.NotFound}`),
            	complete: () => console.info('Operação completa') 
            });
    }

}
