import { Specification } from "../model/Specification";
import {
  ICreateSpecification,
  ISpecificationsRepository,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecification): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (item) => item.name === name
    );

    return specification;
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationsRepository };
