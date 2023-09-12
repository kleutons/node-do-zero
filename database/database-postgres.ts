import { randomUUID } from "crypto";
import { TypeVideo } from "../types/video";
import { sql } from "./db";

export class DatabasePostgres{


    async list(search?: string): Promise<TypeVideo[]> {
        let videos: TypeVideo[];
      
        if (search) {
          const queryResult = await sql`select * from videos where title ilike ${'%' + search + '%'}`;
          videos = queryResult.map((row: any) => ({
  
            id: row.id,
            title: row.title,
            description: row.description,
            duration: Number(row.duration)
            
          }));
        } else {
          const queryResult = await sql`select * from videos`;
          videos = queryResult.map((row: any) => ({

            id: row.id,
            title: row.title,
            description: row.description,
            duration: Number(row.duration)

          }));
        }
      
        return videos;
    }

    async create(video: TypeVideo){
        const videoId = randomUUID();

        const { title, description, duration} = video;

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
    }

    async update(id:string, video: TypeVideo){
      const { title, description, duration} = video;

      await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
    }

    async delete(id:string){
      await sql`delete from videos WHERE id = ${id}`;
    }
}
