import sql from 'mssql';

export const getCommissionByClientId = async (req, res) => {

    var config = {
        user: 'chalkcouture',
        password: 'B9V6~10|PX7v',
        server: 'exigosqlsyncsandbox.c61qznpqe2o1.us-west-1.rds.amazonaws.com',
        database: 'sandbox',
        port: 4433
    };
   
    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.input('CustomerId', sql.Int, req.params.id)
            .query(`  SELECT
            pv.CustomerID
            ,Total = c.Total
            ,r.RankID
            ,r.RankDescription
            ,p.PeriodID
            ,p.PeriodDescription
        FROM PeriodVolumes AS pv
        INNER JOIN Periods AS p 
            ON p.PeriodID = pv.PeriodID
        JOIN CommissionRuns cr
            ON cr.PeriodID = p.PeriodID
        JOIN Commissions c
            ON c.CommissionRunID = cr.CommissionRunID
            AND c.CustomerID = pv.CustomerID
        INNER JOIN Ranks AS r 
            ON r.RankID = pv.PaidRankID
        WHERE 
            pv.CustomerID = @CustomerId
            AND pv.PeriodTypeId = 1
            AND p.EndDate BETWEEN '2019-04-17' AND DATEADD(hh, -24, '2019-10-17')`,
                function (err, recordset) {
                    if (err) {
                        sql.close();
                        res.send(err);
                    }
                    else {
                        sql.close();
                        res.send(recordset.recordset);
                    }
                });
    });
}