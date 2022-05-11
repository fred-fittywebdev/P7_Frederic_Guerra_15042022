import { createConnection, getManager, getRepository } from 'typeorm';
import { Post } from '../entity/post.entity';
import faker from '@faker-js/faker'

createConnection().then(async connection => {
    const repository = getManager().getRepository(Post)

    for (let i = 0; i < 30; i++) {
        await repository.save({
            title: faker.lorem.words(6),
            content: faker.lorem.text(200),
            image: faker.image.imageUrl(400, 400, '', true)
        })
    }

    process.exit(0)
})