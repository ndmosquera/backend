import fs from'fs'
import * as con from '../../utils/GlobalConstants.mjs'

export default class TicketsFs {
    constructor() {
      this.tickets = [];
      this.path = './src/dao/fs/data/tickets.json';
      this.init();
    }
    init() {
      let file = fs.existsSync(this.path);
      if(!file){
        fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
          const fileContent = fs.readFileSync(this.path, 'utf-8');
          this.tickets = JSON.parse(fileContent);
        }
        return true;
    }

    async create(data) {
        try {
          this.tickets.push(data);
          await this.saveToFile();
          return {
            [con.MSG]: "Ticket created successfully",
            [con.DATA]: data,
            [con.STATUS]: con.OK
          };
        } catch (error) {
          return {
            [con.MSG]: error.message,
            [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
            [con.STATUS]: con.ERROR
          };
        }
      }

      read(id = null) {
        try {
            if (id) {
                const ticket = this.tickets.find((ticket) => ticket[con.ID] === id);
                if (ticket) {
                    return {
                        [con.MSG]: 'Ticket found successfully',
                        [con.DATA]: ticket,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no ticket with ID = ${id}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
                if (this.tickets.length > 0) {
                    return {
                        [con.MSG]: 'Tickets read successfully',
                        [con.DATA]: this.tickets,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: 'There are no tickets to show',
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR,
            };
        }
    }

      
      async update(id, data) {
        try {
          let one = this.tickets.find((each) => each[con.ID] == id);
          if (one) {
            for (let prop in data) {
              one[prop] = data[prop];
            }
            await this.saveToFile();
            return {
                [con.MSG] : "Ticket updated successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            };
          } else {
            return {
                [con.MSG] : `There is no ticket with ID = ${id}`,
                [con.DATA] : null,
                [con.STATUS] : con.ERROR
            };
          }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR
            };
        }
      }
      async destroy(id) {
        try {
          let one = this.tickets.find((each) => each[con.ID] == id);
          if (one) {
            this.tickets = this.tickets.filter((each) => each[con.ID] !== id);
            await this.saveToFile();
            return {
                [con.MSG] : "Ticket deleted successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            };
          } else {
            return {
                [con.MSG] : `There is no ticket with ID = ${id}`,
                [con.DATA] : null,
                [con.STATUS] : con.ERROR
            };
          }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR
            };
        }
      }

      async saveToFile() {
        const dataJson = JSON.stringify(this.tickets, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
      }
}