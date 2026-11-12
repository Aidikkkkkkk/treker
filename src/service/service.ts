import { TrekerRepository } from "./repository";
import { initdb } from "./model";

export class TrekerService {
   private trekerRepository: TrekerRepository;
   constructor(trekerRepository: TrekerRepository) {
      this.trekerRepository = trekerRepository;
   }
}
