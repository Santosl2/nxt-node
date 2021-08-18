import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
    async execute(name: string) {
        const tagRepository = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error("Insira um tag válida.");
        }

        const tagAlreadyExits = await tagRepository.findOne({ name });

        if(tagAlreadyExits){
            throw new Error("Tag já existente.");
        }

        const tag = tagRepository.create({
            name
        });

        await tagRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };