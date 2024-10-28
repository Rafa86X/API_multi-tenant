
export async function pagerLab(req, res):Promise<void> {

    const repository = req.repository;
    
    try {
        let { limit = 10, page = 1 } = req.query;
        let { lab } = req.params;

        limit = Number(limit);
        page = Number(page);
        lab = Number(lab);       

        const many = await repository.getAllByLab(limit,page,lab);
        

        const numItens = await repository.countAllByLab(lab);
        let newList:{statusCode:string, send:[]}
        
        

        if (Array.isArray(many.send)) {
             newList = many;           
          }
        else{
            throw new Error('Sem resultados na busca');
        }

        const numPages = calculatesPages(numItens, limit);

        const pager = {
            pager: {
                totalNumberOfItems: numItens,
                totalNumberOfItemsPerPage: limit,
                currentePage: page,
                totalNumberOfPages: parseInt(numPages.toFixed())
            }
        };


        const fullResult = {
            data: newList.send,
            pager: pager
        };

        
            
        return res.status(newList.statusCode).json(fullResult);

    } catch (error) {
        res.status(500).json({ message: `${error} Erro ao paginar` });

    }
}

function calculatesPages(a: number, b: number): number {
    const c = a / b;
    if ((c > 0.01) && (c < 0.5)) { return 1; }
    else { return a / b; }

}
