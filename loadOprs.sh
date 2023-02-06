#!/bin/bash
ssh f3163735@ppa1sas00022 'rm /dados/recup/gecor_servicos/lista_vinculo.sas7bdat'
ssh f3163735@ppa1sas00022 'rm /dados/recup/gecor_servicos/lista_vinculo.txt'
ssh f3163735@ppa1sas00022 '/home/f3163735/iniciaRotina.sh'
scp f3163735@ppa1sas00022:/dados/recup/gecor_servicos/lista_vinculo.txt /dados/arquivos/sas_entrada/

sqlLoad="LOAD DATA INFILE '/dados/arquivos/sas_entrada/lista_vinculo.txt' IGNORE  
INTO TABLE ConectaContabilizar.tb_vinculo_sas FIELDS TERMINATED BY '\t' LINES TERMINATED BY 
'\n' (@c01,@c02,@c03,@c04) set nr_unco=@c01,opr_old=@c02, vinculado=@c03, dt_vcl_ctr=@c04;"

mysql -u -p --execute "SET GLOBAL bulk_insert_buffer_size= 1024 * 1024 * 256;"
mysql -u -p --execute "drop table if exists ConectaContabilizar.tb_vinculo_sas;"
mysql -u -p --execute "CREATE TABLE ConectaContabilizar.tb_vinculo_sas (  
  nr_unco BIGINT,
  opr_old BIGINT,
  vinculado	 BIGINT,
  dt_vcl_ctr VARCHAR(15),		
  INDEX (nr_unco)
);
"
mysql -u -p --execute "$sqlLoad"


