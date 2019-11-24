async function createCall(pool, call_data) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('USE headsup;');
        await conn.query(
            'INSERT INTO calls VALUES (?, ?, ?, ?, ?)',
            [call_data.prid, call_data.cc, call_data.driver,
                call_data.category, call_data.response]
        );
        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false };
    } finally {
        if (conn) {
            conn.release();
        }
    }
}

async function getTotalCalls(pool) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('USE headsup;');
        const count = await conn.query('SELECT count(*) as callCount from calls;');
        delete count['meta'];
        return { success: true, callCount: count[0].callCount };
    } catch (err) {
        console.error(err);
        return { success: false };
    } finally {
        if (conn) {
            conn.release();
        }
    }
}

exports.createCall = createCall;
exports.getTotalCalls = getTotalCalls;