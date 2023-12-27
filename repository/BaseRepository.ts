import { ObjectId, Repository,FindOptionsWhere, FindOneOptions, FindManyOptions, EntityTarget, ObjectLiteral } from "typeorm";
import ds from "../datasource";

export default  class GenericRepository<T extends EntityTarget<ObjectLiteral>>  {

    protected repository: Repository<any>

    constructor(entity: T) {
         ds.getRepository(entity)
    }
    async save(object: T) {
        await this.repository.save(object);
    }
    async update(object: T) {
        await this.repository.save(object);
    }
    async findAll(options?: FindManyOptions<T>): Promise<Array<T>> {
        return await this.repository.find(options);
    }
    async findById(options: FindOneOptions<T>): Promise<T | null> {
        return await this.repository.findOne(options);
    }
    async find(objectQuery: T): Promise<Array<T>> {
        throw new Error("Method not implemented.");
    }
    async delete(criteria: string | number | Date | ObjectId | FindOptionsWhere<T> | string[] | number[] | Date[] | ObjectId[]) {
        await this.repository.delete(criteria);
    }

}