import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBook(bookId: string): Promise<Book> {
    return await this.bookRepository.findOne({ where: { id: bookId } });
  }

  async isBookInStock(bookId: string, quantity: number): Promise<boolean> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    return quantity <= book.stock;
  }

  async decreaseStock(bookId: string, quantity: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    book.stock -= quantity;
    return await this.bookRepository.save(book);
  }

  async increaseStock(bookId: string, quantity: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    console.log('Increasing stock for book:', book);
    book.stock += quantity;
    return await this.bookRepository.save(book);
  }

  async createBook(data: { title: string; author: string; price: number; stock: number }): Promise<Book> {
    const newBook = this.bookRepository.create(data);
    return await this.bookRepository.save(newBook);
  }
}