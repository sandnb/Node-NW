# Database
 * MongoDB(NoSQL DB) -> they represent data in JSON file
 * Collection ->  group of documents
 * document -> a representation of data in an object format 
 * user = [{},{},{},{}] , each of '{}' are documents & 'user' is a collection
 * In order to draw parllels between SQL & NoSQL
        ** 'table' in SQL is equivalent to 'Collection' in MongoDB
        ** 'row' in a SQL is equivalent to 'document' in MongoDB
        ** 'column' in SQL is equivalent to 'key' in MongoDB
* We choose MongoDB if we want to do more changes in DB more frequently, here in MongoDB 
  'key' is very important ,due to which this DB is more efficient for frequent changes,
  as in SQL then if any changes you want to make to the table instatenously , sometime
  this need to include a 'new coloumn' into the table,this is costly operation.

 